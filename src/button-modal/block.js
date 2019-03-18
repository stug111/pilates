//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { Fragment } = wp.element;

const { RichText, InspectorControls } = wp.editor;

const { PanelBody, SelectControl } = wp.components;

registerBlockType( 'pilates/button-modal', {
	title: __( 'Кнопка записи' ),
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
		order: {
			type: 'string',
			default: '#orderPhone',
		},
		align: {
			type: 'string',
			default: 'none',
		},
	},
	supports: {
		align: true,
		alignWide: false,
	},
	edit: function( props ) {
		const { attributes, setAttributes, className } = props;
		const { buttonText, color, order, align } = attributes;

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
						<SelectControl
							label={ __( 'Форма вызова' ) }
							value={ order }
							options={ [
								{ label: 'Записаться на первое занятие', value: '#orderPhone' },
								{ label: 'Записаться в Академию', value: '#orderAcademy' },
							] }
							onChange={ order => {
								setAttributes( { order } );
							} }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);

		return (
			<Fragment>
				{ controls }
				<div className={ className }>
					<RichText
						className={ 'site-button ' + color }
						placeholder={ __( 'Текст ссылки...' ) }
						onChange={ buttonText => setAttributes( { buttonText } ) }
						value={ buttonText }
						data-src={ '' + order + '' }
						href="javascript:;"
						data-fancybox=""
					/>
				</div>
			</Fragment>
		);
	},
	save: function( props ) {
		const { attributes } = props;
		const { buttonText, color, order, align } = attributes;
		return (
			<div className={ `align${ align }` }>
				<RichText.Content
					tagName="a"
					className={ 'site-button ' + color }
					data-src={ '' + order + '' }
					href="javascript:;"
					data-fancybox=""
					value={ buttonText }
				/>
			</div>
		);
	},
} );
