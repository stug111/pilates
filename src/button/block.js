//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { Fragment } = wp.element;

const { RichText, InspectorControls, URLInput } = wp.editor;

const { PanelBody, SelectControl, Dashicon, IconButton } = wp.components;

registerBlockType( 'pilates/button', {
	title: __( 'Кнопка' ),
	icon: 'editor-removeformatting',
	category: 'pilates',
	attributes: {
		buttonText: {
			type: 'string',
		},
		color: {
			type: 'string',
			default: '',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
		},
	},
	edit: function( props ) {
		const { attributes, isSelected, setAttributes } = props;
		const { buttonText, color, url } = attributes;

		const controls = (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Настройки' ) }>
						<SelectControl
							label={ __( 'Тип кнопки' ) }
							value={ color }
							options={ [
								{ label: 'Красная', value: '' },
								{ label: 'Черная', value: 'black' },
							] }
							onChange={ color => {
								setAttributes( { color } );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);

		return (
			<Fragment>
				{ controls }
				<RichText
					className={ 'site-button ' + color }
					placeholder={ __( 'Текст ссылки...' ) }
					onChange={ buttonText => setAttributes( { buttonText } ) }
					value={ buttonText }
				/>
				{ isSelected && (
					<form
						className="block-library-button__inline-link"
						onSubmit={ event => event.preventDefault() }
					>
						<Dashicon icon="admin-links" />
						<URLInput
							value={ url }
							onChange={ value => setAttributes( { url: value } ) }
						/>
						<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />
					</form>
				) }
			</Fragment>
		);
	},
	save: function( props ) {
		const { attributes } = props;
		const { buttonText, color, url } = attributes;
		return (
			<RichText.Content
				tagName="a"
				className={ 'site-button ' + color }
				href={ url }
				value={ buttonText }
			/>
		);
	},
} );
