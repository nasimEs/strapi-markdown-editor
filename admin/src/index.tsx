import React from 'react';
import { useIntl } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Box, Flex, Typography } from '@strapi/design-system';
import DOMPurify from 'dompurify';

interface MarkdownEditorProps {
    attribute: { type: string; [key: string]: any };
    description?: { id: string; defaultMessage: string } | string;
    disabled?: boolean;
    error?: string;
    intlLabel: { id: string; defaultMessage: string };
    labelAction?: React.ReactNode;
    name: string;
    onChange: (event: { target: { name: string; value: string; type: string } }) => void;
    required?: boolean;
    value?: string;
}

const mdParser = new MarkdownIt();

const Input: React.FC<MarkdownEditorProps> = ({
                                                  attribute,
                                                  description,
                                                  disabled,
                                                  error,
                                                  intlLabel,
                                                  name,
                                                  onChange,
                                                  required,
                                                  value,
                                              }) => {
    const { formatMessage } = useIntl();
    const label = intlLabel ? formatMessage(intlLabel) : name;

    return (
        <Flex direction="column" alignItems="stretch" gap={1}>
            <Flex gap={1}>
                <Typography variant="pi" fontWeight="bold" textColor="neutral800">
                    {label}
                    {required && <Typography textColor="danger600">*</Typography>}
                </Typography>
            </Flex>

            <Box
                borderColor={error ? 'danger600' : 'neutral200'}
                borderStyle="solid"
                borderWidth="1px"
                borderRadius="4px"
                overflow="hidden"
                shadow="tableShadow"
            >
                <MdEditor
                    value={value || ''}
                    style={{ height: '300px' }}
                    renderHTML={(text) => DOMPurify.sanitize(mdParser.render(text))}
                    readOnly={disabled}
                    onChange={({ text }) => {
                        onChange({
                            target: {
                                name,
                                value: text,
                                type: attribute.type,
                            },
                        });
                    }}
                />
            </Box>

            {error ? (
                <Typography variant="pi" textColor="danger600">{error}</Typography>
            ) : description ? (
                <Typography variant="pi" textColor="neutral600">
                    {typeof description === 'string' ? description : formatMessage(description)}
                </Typography>
            ) : null}
        </Flex>
    );
};

export default {
    register(app: any) {
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
