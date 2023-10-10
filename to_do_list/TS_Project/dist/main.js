"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/style.css");
const FullList_1 = __importDefault(require("./model/FullList"));
const ListItem_1 = __importDefault(require("./model/ListItem"));
const ListTemplates_1 = __importDefault(require("./templates/ListTemplates"));
const initApp = () => {
    const fullList = FullList_1.default.instance;
    const template = ListTemplates_1.default.instance;
    // Add listener to new entry form submit
    const itemEntryForm = document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // Get the new item value
        const input = document.getElementById("newItem");
        const newEntryText = input.value.trim();
        if (!newEntryText.length)
            return;
        // calculate item ID
        const itemId = fullList.list.length
            ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
            : 1;
        // create new item
        const newItem = new ListItem_1.default(itemId.toString(), newEntryText);
        // Add new item to full list
        fullList.addItem(newItem);
        // Re-render list with new item included
        template.render(fullList);
    });
    // Add listener to "Clear" button
    const clearItems = document.getElementById("clearItemsButton");
    clearItems.addEventListener('click', () => {
        fullList.clearList();
        template.clear();
    });
    // load initial data
    fullList.load();
    // initial render of template
    template.render(fullList);
};
document.addEventListener("DOMContentLoaded", initApp);
