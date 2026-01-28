export default (plugin) => {
    plugin.customFields.register({
        name: 'markdown-editor',
        plugin: 'markdown-editor',
        type: 'text',
    });
    return plugin;
};
