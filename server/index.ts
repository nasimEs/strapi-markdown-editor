export default (plugin: any) => {
    plugin.customFields.register({
        name: 'markdown-editor',
        plugin: 'markdown-editor',
        type: 'text',
    });

    return plugin;
};
