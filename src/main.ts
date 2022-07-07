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
const getTextInputElement = <HTMLInputElement>(
	document.getElementById(`${'pic-text'}-text`)
);
const getImageButtonElement = <HTMLInputElement>(
	document.querySelector(`[data-button = ${'pic-text'}]`)
);
const getOutputElement: HTMLElement | null = document.querySelector(
	`[data-model=${'pic-text'}]  .output`,
);

// File Pond Element & Options
let imageSRC: string;
const getImageEntryElement = <HTMLInputElement>(
	document.getElementById(`${'pic-text'}-file`)
);

FilePond.create(getImageEntryElement, {
	imagePreviewMaxHeight: 200,

	onpreparefile: (fileItem, output) => {
		// create a new image object
		const img = new Image();

		// set the image source to the output of the Image Transform plugin
		img.src = URL.createObjectURL(output);
		imageSRC = img.src;
	},
});

getImageButtonElement.addEventListener('click', () => {
	if (getOutputElement === null) {
		return;
	}
	getOutputElement.style.background = `url(${imageSRC}) center no-repeat`;
	getOutputElement.style.backgroundSize = '300px';
	getOutputElement.style.backgroundClip = 'text';
	getOutputElement.style.webkitBackgroundClip = 'text';
	getOutputElement.style.webkitTextFillColor = 'rgba(255, 255, 255, 0.1)';
	getOutputElement.innerText = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae placeat odit porro sint illo deserunt totam reiciendis voluptatibus qui dolores. Veritatis beatae eius minima aliquid blanditiis earum delectus itaque natus?Quisquam nihil hic tempora reprehenderit eum quam, illo voluptatem ex tenetur, cumque accusamus ipsum ad necessitatibus nobis, fuga voluptatum mollitia. Provident quas nam vero in, officiis explicabo est neque optio!Voluptas aperiam libero excepturi saepe praesentium! Quasi provident sapiente saepe, harum voluptate voluptatem incidunt animi nesciunt quis nam exercitationem at maiores dignissimos hic consequatur, et accusantium tempore natus enim fugiat.Aspernatur id atque accusantium ad delectus, praesentium minima voluptas iure quos repellat quo quaerat doloribus libero expedita, nisi ex nobis earum.
	   `;
	console.log(getTextInputElement?.value);
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
