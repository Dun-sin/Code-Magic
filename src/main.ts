import * as FilePond from 'filepond';
import 'filepond/dist/filepond.min.css';

// File Pond Plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

FilePond.registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginImageResize,
	FilePondPluginImageTransform,
);

let attributeValue: string | null;

// Elements
const generators = document.querySelectorAll('[data-gen]');
// const countElement = document.querySelector('.count > span');
const textInputElement = <HTMLInputElement>(
	document.getElementById(`${'pic-text'}-text`)
);
const getImageButtonElement = <HTMLInputElement>(
	document.querySelector(`[data-button = ${'pic-text'}]`)
);

// File Pond Element & Options
let imageSRC: string;
const imageEntryElement = <HTMLInputElement>(
	document.getElementById(`${'pic-text'}-file`)
);

FilePond.create(imageEntryElement, {
	imagePreviewMinHeight: 400,

	onpreparefile: (fileItem, output) => {
		// create a new image object
		const img = new Image();

		// set the image source to the output of the Image Transform plugin
		img.src = URL.createObjectURL(output);
		imageSRC = img.src;
	},
});

getImageButtonElement.addEventListener('click', () => {
	console.log(textInputElement?.value);
});

generators.forEach((generator) => {
	generator?.addEventListener('click', () => {
		attributeValue = generator.getAttribute('data-gen');
		if (attributeValue === null) {
			return;
		} else {
			console.log(attributeValue);
		}
	});
});
