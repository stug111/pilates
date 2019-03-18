const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, MediaUpload, MediaUploadCheck } = wp.editor;
const { Button } = wp.components;

const ALLOWED_MEDIA_TYPES = [ 'image' ];
const TEMPLATE = [ [ 'core/paragraph' ], [ 'core/paragraph' ] ];

registerBlockType( 'pilates/trainer', {
	title: __( 'Тренер' ),
	icon: 'admin-users',
	category: 'pilates',
	parent: [ 'pilates/trainers' ],
	attributes: {
		mediaId: {
			type: 'number',
		},
		url: {
			type: 'string',
		},
		alt: {
			type: 'string',
		},
	},
	supports: {
		anchor: true,
	},
	edit: function( props ) {
		const { className, attributes, setAttributes } = props;
		const { mediaId, url, alt } = attributes;

		const mediaSelected = media => {
			setAttributes( {
				mediaId: media.id,
				url: media.url,
				alt: media.alt,
			} );
		};

		return (
			<div className={ className }>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ mediaSelected }
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						value={ mediaId }
						render={ ( { open } ) => (
							<Button onClick={ open }>
								{ __( 'Open Media Library', 'pilates' ) }
							</Button>
						) }
					/>
				</MediaUploadCheck>
				<div className="trainers__image">
					<img src={ url } alt={ alt } />
				</div>
				<InnerBlocks templateLock={ false } template={ TEMPLATE } />
			</div>
		);
	},
	save: function( props ) {
		const { attributes } = props;
		const { url, alt } = attributes;

		return (
			<div>
				<div className="trainers__image">
					<img src={ url } alt={ alt } />
				</div>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
