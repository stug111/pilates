import './style.scss';
import './components/trainer';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { InnerBlocks, BlockControls } = wp.editor;
const { Toolbar, IconButton } = wp.components;
const { select } = wp.data;

const getTrainerTemplate = numTrainer => {
	const trainer = [];

	for ( let i = 0; i < numTrainer; i++ ) {
		trainer.push( [ 'pilates/trainer' ] );
	}

	return trainer;
};

registerBlockType( 'pilates/trainers', {
	title: __( 'Тренеры' ),
	icon: 'admin-users',
	category: 'pilates',
	attributes: {
		numTrainer: {
			type: 'number',
			default: 1,
		},
		images: {
			type: 'array',
			default: [],
		},
	},
	edit: function( props ) {
		const { clasName, attributes, setAttributes, name } = props;
		const { numTrainer, images } = attributes;

		const blocks = select( 'core/editor' ).getBlocks();

		const getImagesBlocks = blocks.map( block => {
			if ( block.name === name ) {
				const array = [];
				block.innerBlocks.map( ( item, index ) => {
					array.push( {
						url: item.attributes.url,
						alt: item.attributes.alt,
						anchor: item.attributes.anchor,
					} );
				} );

				return array;
			}
		} );

		const addListItem = newListItems => {
			setAttributes( { images: [ ...newListItems ] } );
		};

		const blockControls = (
			<BlockControls>
				<Toolbar>
					<IconButton
						icon="plus"
						label={ __( 'Добавить', 'pilates' ) }
						clasName="components-button"
						onClick={ () => {
							setAttributes( { numTrainer: numTrainer + 1 } );
						} }
					/>
					<IconButton
						icon="no"
						label={ __( 'Удалить', 'pilates' ) }
						clasName="components-button"
						onClick={ () => {
							setAttributes( { numTrainer: numTrainer - 1 } );
						} }
					/>
				</Toolbar>
			</BlockControls>
		);

		console.log( images );

		return (
			<Fragment>
				{ blockControls }
				<div
					clasName={ clasName }
					onClick={ () => {
						addListItem( getImagesBlocks );
					} }
				>
					<InnerBlocks
						templateLock="all"
						template={ getTrainerTemplate( numTrainer ) }
					/>
				</div>
			</Fragment>
		);
	},
	save: function( props ) {
		const { attributes } = props;
		const { images } = attributes;

		return (
			<div className="trainers__grid">
				<div id="list-example" className="list-group">
					{ images[ 0 ].map( ( item, index ) => (
						<a
							className={ `list-group-item list-group-item-action ${
								index === 0 ? 'active' : ''
							}` }
							href={ `#${ item.anchor }` }
							key={ index }
						>
							<img src={ item.url } alt={ item.alt } />
						</a>
					) ) }
				</div>
				<div
					data-spy="scroll"
					data-target="#list-example"
					data-offset="251.41"
					className="scrollspy-example"
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
