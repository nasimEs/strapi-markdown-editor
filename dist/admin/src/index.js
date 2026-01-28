import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useIntl } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import DOMPurify from 'dompurify';
import 'react-markdown-editor-lite/lib/index.css';
import { Box, Flex, Typography } from '@strapi/design-system';
const mdParser = new MarkdownIt();
const MarkdownInput = ({ attribute, description, disabled, error, intlLabel, name, onChange, required, value, }) => {
    const { formatMessage } = useIntl();
    const label = intlLabel ? formatMessage(intlLabel) : name;
    return (_jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [_jsx(Flex, { gap: 1, children: _jsxs(Typography, { variant: "pi", fontWeight: "bold", textColor: "neutral800", children: [label, required && _jsx(Typography, { textColor: "danger600", children: "*" })] }) }), _jsx(Box, { borderColor: error ? 'danger600' : 'neutral200', borderStyle: "solid", borderWidth: "1px", borderRadius: "4px", overflow: "hidden", shadow: "tableShadow", children: _jsx(MdEditor, { value: value || '', style: { height: '300px' }, renderHTML: (text) => DOMPurify.sanitize(mdParser.render(text)), readOnly: disabled, onChange: ({ text }) => {
                        onChange({
                            target: {
                                name,
                                value: text,
                                type: attribute.type,
                            },
                        });
                    } }) }), error ? (_jsx(Typography, { variant: "pi", textColor: "danger600", children: error })) : description ? (_jsx(Typography, { variant: "pi", textColor: "neutral600", children: typeof description === 'string' ? description : formatMessage(description) })) : null] }));
};
export default {
    register(app) {
        console.log('✅ Markdown Editor admin loaded'); // برای تست
        app.customFields.register({
            name: 'markdown-editor',
            pluginId: 'markdown-editor',
            type: 'text',
            intlLabel: {
                id: 'markdown-editor.label',
                defaultMessage: 'Markdown Editor',
            },
            intlDescription: {
                id: 'markdown-editor.description',
                defaultMessage: 'Custom Markdown Editor',
            },
            components: {
                Input: async () => import('./components/MarkdownInput'),
            },
        });
    },
    async registerTrads() {
        return [];
    },
};
