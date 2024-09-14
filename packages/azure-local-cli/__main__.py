import os

port = int(os.environ.get("LOCALSANDBOX_PORT") or 7329)
hostname = f"localhost.localsandbox.sh"
endpoint = f"https://{hostname}:{port}/azure"

import azure.cli.core as azure_cli_core

get_default_cli = azure_cli_core.get_default_cli


def get_cli():
    cli = get_default_cli()
    getboolean_real = cli.config.getboolean

    def getboolean(section, option, fallback=None):
        if section == "core" and option == "instance_discovery":
            return False

        return getboolean_real(section, option, fallback=fallback)

    cli.config.getboolean = getboolean

    return cli


from msal import PublicClientApplication
from addict import Dict as AttrDict


class LocalSandboxUserCredential(PublicClientApplication):
    def __init__(self, client_id, username, **kwargs):
        self.username = username
        super().__init__(client_id, **kwargs)

    def get_token(self, *args, **kwargs):
        return AttrDict(
            {"token": self.username, "expires_in": float("inf"), "id": "id"}
        )


import azure.cli.core.auth.msal_authentication as msal_authentication

msal_authentication.UserCredential = LocalSandboxUserCredential

import azure.cli.core._profile as _profile

default_subscription_id = os.environ.get("AZURE_SUBSCRIPTION_ID") or "default"

_profile.Profile.get_subscription = lambda _, b: AttrDict(
    {
        "user": {"type": "user", "name": b or default_subscription_id},
        "id": b or default_subscription_id,
        "tenantId": b or default_subscription_id,
    }
)

azure_cli_core.get_default_cli = get_cli

import warnings

warnings.filterwarnings("ignore")

from azure.cli.core import cloud

from adal.constants import AADConstants

AADConstants.WORLD_WIDE_AUTHORITY = hostname
AADConstants.WELL_KNOWN_AUTHORITY_HOSTS.append(hostname)

cloud.AZURE_PUBLIC_CLOUD.endpoints.management = endpoint
cloud.AZURE_PUBLIC_CLOUD.endpoints.resource_manager = endpoint
cloud.AZURE_PUBLIC_CLOUD.endpoints.active_directory = endpoint

from azure.cli import __main__
