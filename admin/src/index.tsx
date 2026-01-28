import pluginId from './pluginId';
import MarkdownInput from './components/MarkdownInput';

export default {
    register(app: any) {
        console.log('✅ Markdown Editor admin loaded'); // test log

        app.registerPlugin({
            id: pluginId,
            name: 'Markdown Editor Plugin',
            isReady: true,
            initializer: () => null,
        });

        // Register the custom field
        app.customFields.register({
            name: 'markdown-editor',
            pluginId: pluginId,
            type: 'text',
            intlLabel: {
                id: `${pluginId}.label`,
                defaultMessage: 'Markdown Editor',
            },
            intlDescription: {
                id: `${pluginId}.description`,
                defaultMessage: 'Custom Markdown Editor',
            },
            components: {
                Input: MarkdownInput,
            },
        });
    },

    async registerTrads() {
        return [];
    },
};
