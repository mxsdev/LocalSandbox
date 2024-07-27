/// <reference types="./mssql-query-compiler.d.ts" />
import { DefaultQueryCompiler } from '../../query-compiler/default-query-compiler.js';
export class MssqlQueryCompiler extends DefaultQueryCompiler {
    getCurrentParameterPlaceholder() {
        return `@${this.numParameters}`;
    }
    visitOffset(node) {
        super.visitOffset(node);
        this.append(' rows');
    }
    // mssql allows multi-column alterations in a single statement,
    // but you can only use the command keyword/s once.
    // it also doesn't support multiple kinds of commands in the same
    // alter table statement, but we compile that anyway for the sake
    // of WYSIWYG.
    compileColumnAlterations(columnAlterations) {
        const nodesByKind = {};
        for (const columnAlteration of columnAlterations) {
            if (!nodesByKind[columnAlteration.kind]) {
                nodesByKind[columnAlteration.kind] = [];
            }
            nodesByKind[columnAlteration.kind].push(columnAlteration);
        }
        let first = true;
        if (nodesByKind.AddColumnNode) {
            this.append('add ');
            this.compileList(nodesByKind.AddColumnNode);
            first = false;
        }
        // multiple of these are not really supported by mssql,
        // but for the sake of WYSIWYG.
        if (nodesByKind.AlterColumnNode) {
            if (!first)
                this.append(', ');
            this.compileList(nodesByKind.AlterColumnNode);
        }
        if (nodesByKind.DropColumnNode) {
            if (!first)
                this.append(', ');
            this.append('drop column ');
            this.compileList(nodesByKind.DropColumnNode);
        }
        // not really supported by mssql, but for the sake of WYSIWYG.
        if (nodesByKind.ModifyColumnNode) {
            if (!first)
                this.append(', ');
            this.compileList(nodesByKind.ModifyColumnNode);
        }
        // not really supported by mssql, but for the sake of WYSIWYG.
        if (nodesByKind.RenameColumnNode) {
            if (!first)
                this.append(', ');
            this.compileList(nodesByKind.RenameColumnNode);
        }
    }
    visitAddColumn(node) {
        this.visitNode(node.column);
    }
    visitDropColumn(node) {
        this.visitNode(node.column);
    }
    visitMergeQuery(node) {
        super.visitMergeQuery(node);
        this.append(';');
    }
    announcesNewColumnDataType() {
        return false;
    }
}
