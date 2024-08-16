import {Plugin} from '@ckeditor/ckeditor5-core';
import {ButtonView} from '@ckeditor/ckeditor5-ui';
import {toWidgetEditable} from '@ckeditor/ckeditor5-widget';

export class TarteAuCitron extends Plugin {
    static pluginName = 'TarteAuCitron';
    static tag = 'tarteaucitron';

    init() {
        const editor = this.editor;

        editor.model.schema.register(TarteAuCitron.tag, {
            allowWhere: '$text',
            allowAttributes: ['type'],
            isObject: true,
            isBlock: true,
        });

        editor.model.schema.extend('$text', {
            allowIn: TarteAuCitron.tag
        });

        editor.conversion
            .for('editingDowncast')
            .elementToElement({
                model: TarteAuCitron.tag,
                view: (modelItem, conversionApi) => {
                    const {writer} = conversionApi;
                    const widgetElement = writer.createContainerElement(TarteAuCitron.tag);
                    return toWidgetEditable(widgetElement, writer);
                }
            });

        editor.conversion
            .for('dataDowncast')
            .elementToElement({
                model: TarteAuCitron.tag,
                view: TarteAuCitron.tag
            });

        editor.conversion
            .for('upcast')
            .elementToElement({
                view: TarteAuCitron.tag,
                model: TarteAuCitron.tag
            });

        editor.conversion
            .for('downcast')
            .attributeToAttribute({
                model: 'type',
                view: 'type',
                converterPriority: 'low'
            });

        editor.conversion
            .for('upcast')
            .attributeToAttribute({
                view: 'type',
                model: 'type',
                converterPriority: 'low'
            });

        editor.ui.componentFactory.add('tac', () => {
            const button = new ButtonView();

            button.set({
                label: 'TaC',
                withText: true,
                tooltip: false,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M484.1 27.9C456-.2 416.1-8.1 387.1 8.9 347.6 31.8 223.5-41.1 91.2 91.2-41.3 223.7 31.9 347.5 8.9 387.1c-16.9 29.1-9.1 68.9 19 97.1 28.1 28.1 68 35.9 97.1 19 39.4-23 163.6 50 295.9-82.3 132.5-132.5 59.3-256.3 82.3-295.9 16.9-29.1 9.1-68.9-19-97.1zm-22.4 72.9c-38.8 66.6 45.6 165.6-74.8 286.1-120.4 120.4-219.5 36-286.1 74.8-22.7 13.2-64-27.2-50.5-50.5 38.8-66.6-45.6-165.6 74.8-286.1C245.6 4.7 344.6 89.1 411.2 50.3c22.7-13.2 64 27.3 50.5 50.5zm-169.9 8.7c1.4 11-6.4 21-17.4 22.3-54.8 6.9-135.8 87.8-142.6 142.6-1.4 11-11.4 18.7-22.3 17.4-11-1.4-18.7-11.4-17.4-22.3 9.2-73.3 104.2-168.2 177.4-177.4 11-1.4 21 6.4 22.3 17.4z"/></svg>'
            });

            button.on('execute', () => {
                editor.model.change(writer => {
                    try {
                        let cursor = editor.model.document.selection.getFirstPosition();
                        if (cursor && cursor.parent && cursor.parent.name === TarteAuCitron.tag) {
                            writer.unwrap(cursor.parent);

                            return;
                        }

                        const elem = writer.createElement(TarteAuCitron.tag, { type: 'triggerControlCenter' });
                        writer.wrap(editor.model.document.selection.getFirstRange(), elem);
                    } catch (e) {
                        console.warn(e);
                    }
                });
            });

            return button;
        });
    }
}
