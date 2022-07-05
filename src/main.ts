import * as FilePond from 'filepond';
import 'filepond/dist/filepond.min.css';

// File Pond Plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

let attributeValue: string | null;

const generators = document.querySelectorAll('[data-gen]');
// const countElement = document.querySelector('.count > span');
const textInput = <HTMLInputElement>(
	document.getElementById(`${'pic-text'}-text`)
);
const buttonElement = <HTMLInputElement>(
	document.querySelector(`[data-button = ${'pic-text'}]`)
);

// File Pond
const imageElement = <HTMLInputElement>(
	document.getElementById(`${'pic-text'}-file`)
);

FilePond.registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginImageResize,
	FilePondPluginImageTransform,
);

const pond = FilePond.create(imageElement, {
	imagePreviewMinHeight: 400,
});

buttonElement.addEventListener('click', () => {
	console.log(textInput?.value);
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
