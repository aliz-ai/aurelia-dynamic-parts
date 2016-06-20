var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define("aurelia-dynamic-parts", ["require", "exports", 'aurelia-framework'], function (require, exports, aurelia_framework_1) {
    "use strict";
    var DynamicPanel = (function () {
        function DynamicPanel() {
        }
        DynamicPanel.prototype.bind = function (bindingContext, overrideContext) {
            var template = '<template><div class="dynamic-panel">';
            if (this.panelDefinition.caption) {
                template += '<div class="dynamic-panel-caption">' + this.panelDefinition.caption + '</div>';
            }
            this.panelDefinition.items.forEach(function (item) {
                template +=
                    '<div class="dynamic-panel-item">' +
                        '  <div class="item-label">' + item.caption + '</div>' +
                        '  <div class="item-value">${panelData.' + item.propertyName + '}</div>' +
                        '</div>';
            });
            template += '</div></template>';
            this.viewStrategy = new aurelia_framework_1.InlineViewStrategy(template);
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], DynamicPanel.prototype, "panelDefinition", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], DynamicPanel.prototype, "panelData", void 0);
        DynamicPanel = __decorate([
            aurelia_framework_1.inlineView('<template><compose view.bind="viewStrategy"></compose></template>'), 
            __metadata('design:paramtypes', [])
        ], DynamicPanel);
        return DynamicPanel;
    }());
    exports.DynamicPanel = DynamicPanel;
    var PanelDefinitionBuilder = (function () {
        function PanelDefinitionBuilder() {
            this.tableDefinition = { items: [] };
        }
        PanelDefinitionBuilder.prototype.withPropertyItem = function (propertyDescriptor, caption) {
            this.tableDefinition.items.push({
                caption: caption,
                propertyName: propertyDescriptor.name
            });
            return this;
        };
        PanelDefinitionBuilder.prototype.build = function () {
            return this.tableDefinition;
        };
        return PanelDefinitionBuilder;
    }());
    exports.PanelDefinitionBuilder = PanelDefinitionBuilder;
    var DynamicTable = (function () {
        function DynamicTable() {
        }
        DynamicTable.prototype.bind = function (bindingContext, overrideContext) {
            var template = '<template><table><thead>';
            this.tableDefinition.columns.forEach(function (column) {
                template += '<th>' + column.caption + '</th>';
            });
            template += '</thead><tbody>';
            template += '<tr repeat.for="item of tableData">';
            this.tableDefinition.columns.forEach(function (column) {
                template += '<td>${item.' + column.propertyName + '}</td>';
            });
            template += '</tr>';
            template += '</tbody></table></template>';
            this.viewStrategy = new aurelia_framework_1.InlineViewStrategy(template);
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], DynamicTable.prototype, "tableDefinition", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Array)
        ], DynamicTable.prototype, "tableData", void 0);
        DynamicTable = __decorate([
            aurelia_framework_1.inlineView('<template><compose view.bind="viewStrategy"></compose></template>'), 
            __metadata('design:paramtypes', [])
        ], DynamicTable);
        return DynamicTable;
    }());
    exports.DynamicTable = DynamicTable;
    var TableDefinitionBuilder = (function () {
        function TableDefinitionBuilder() {
            this.tableDefinition = { columns: [] };
        }
        TableDefinitionBuilder.prototype.withPropertyColumn = function (propertyDescriptor, caption) {
            this.tableDefinition.columns.push({
                caption: caption,
                propertyName: propertyDescriptor.name
            });
            return this;
        };
        TableDefinitionBuilder.prototype.build = function () {
            return this.tableDefinition;
        };
        return TableDefinitionBuilder;
    }());
    exports.TableDefinitionBuilder = TableDefinitionBuilder;
});
