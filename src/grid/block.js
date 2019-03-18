//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	RichText,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
	URLInput,
} = wp.editor;

const { Dashicon, IconButton, Button } = wp.components;
const ALLOWED_MEDIA_TYPES = [ 'image' ];

registerBlockType( 'pilates/grid', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Сетка' ), // Block title.
	icon: 'schedule', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'pilates', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		title: {
			type: 'string',
		},
		url: {
			type: 'string',
			default: '',
		},
		alt: {
			type: 'string',
			default: '',
		},
		align: {
			type: 'string',
			default: 'full',
		},
	},
	supports: {
		align: [ 'full' ],
		anchor: true,
	},
	edit: function( props ) {
		const { setAttributes, attributes } = props;
		const { title, url, alt } = attributes;

		const selectMedia = media => {
			setAttributes( {
				url: media.url,
				alt: media.alt,
			} );
		};

		return (
			<div className="philosophy__grid">
				<div className="philosophy__block-image">
					<img src={ url } alt={ alt } />
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ selectMedia }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							// value={ mediaId }
							render={ ( { open } ) => (
								<Button onClick={ open }>{ __( 'Выбрать изображение' ) }</Button>
							) }
						/>
					</MediaUploadCheck>
					<RichText
						tagName="p"
						className="philosophy__block-image-title"
						placeholder={ __( 'Описание...' ) }
						onChange={ title => setAttributes( { title } ) }
						value={ title }
					/>
				</div>
				<div className="philosophy__block-text">
					<InnerBlocks templateLock={ false } />
				</div>
			</div>
		);
	},
	save: function( props ) {
		const { attributes } = props;
		const { title, url, alt } = attributes;

		return (
			<div className="philosophy__grid">
				<div className="philosophy__block-image">
					<img src={ url } alt={ alt } />
					<RichText.Content
						tagName="p"
						className="philosophy__block-image-title"
						value={ title }
					/>
				</div>
				<div className="philosophy__block-text">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
