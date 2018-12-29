import FilePicker from 'pickfiles';
import {ReadAs} from 'pickfiles';

/**
 * @fires ImagePicker#ready - called with each Image as it becomes ready to use.
 * @fires ImagePicker#allready - called when all images are ready to use.
 */
export default class ImagePicker extends FilePicker {

	/**
	 * {Number} Number of Images ready.
	 */
	get ready() { return this._ready; }

	/**
	 * 
	 * @param {HTMLElement} opts - Element for selecting an image.
	 */
	constructor( opts=null ) {

		super( opts );
	
		this.readAs = this.readAs || ReadAs.DATA_URL;

		this.on( 'load', this._dataLoaded );

		this._images = [];

	}

	/**
	 * Abort all image loading.
	*/
	abort() {

		for( let i = this._images.length-1; i >= 0; i-- ) {
			this._images[i].abort();
		}
		super.abort();

	}

	/**
	 * Overloaded to reset the images when new files are picked.
	 * @param {FileList|File} files 
	 */
	dispatch(files ) {

		this._ready = 0;
		this._images.length = 0;

		super.dispatch(files);

	}

	_dataLoaded( result ) {

		if ( this.readAs !== ReadAs.DATA_URL ) return;

		let img = new Image();
		img.onload = ()=>this._imgLoaded( img );
		img.onerror = e=>this._error(e);

		this._images.push( img );
		img.src = result;

	}

	_imgLoaded( img ) {

		/**
		 * @event ImagePicker#ready
		 * @type {Image}
		 */
		this.emit( 'ready', img );

		if ( ++this._ready === this._loading ) {

			/**
		 	* @event ImagePicker#allready
		 	* @type {Image[]}
			 */
			if ( this._images.length === 1 ) this.emit('allready', this._images[0] )
			else this.emit( 'allready', this._images.slice() );

		}

	}

}