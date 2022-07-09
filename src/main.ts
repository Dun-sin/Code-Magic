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

// Variables
let attributeValue: string | null = null;
let isOpen: boolean;
// File Pond Element & Options
let imageSRC: string;

// Elements
const generators = document.querySelectorAll('[data-gen]');
const closeModalElement = document.getElementById('close-modal');
const modalContainerElement = <HTMLElement>(
	document.querySelector('.modal-container')
);

// Close button for modals
closeModalElement?.addEventListener('click', () => {
	isOpen = false;

	isVisible(isOpen);
});
// adding an event listeners to all generators card
generators.forEach((generator) => {
	generator?.addEventListener('click', () => {
		isOpen = true;
		isVisible(isOpen);
		const checking = generator.getAttribute('data-gen');
		if (checking === null) return;

		attributeValue = checking;
		checkingIfGeneratorExists(attributeValue);
	});
});

function checkingIfGeneratorExists(attribute: string | null): void {
	if (attribute === null) return;

	generatorsFunction(attribute);
	getImageFile(attribute);
	// downloadImage(attribute);
	changeHeaderText(attribute);
}

function changeHeaderText(attriute: string): void {
	const modalHeaderTextElement = <HTMLElement>(
		document.getElementById('heading-text-modal')
	);

	attriute = attriute.charAt(0).toUpperCase() + attriute.slice(1);
	modalHeaderTextElement.innerText = `${attriute} Generator`;
}

function isVisible(isOpen: boolean) {
	if (isOpen) {
		modalContainerElement.style.display = 'grid';
	} else {
		modalContainerElement.style.display = 'none';
	}
}

function generatorsFunction(attribute: string): void {
	const getTextInputElement = <HTMLInputElement>(
		document.getElementById(`${attribute}-text`)
	);

	const getOutputElement = <HTMLElement>(
		document.querySelector(`[data-model=${attribute}]  .output`)
	);

	countForText(getTextInputElement);
	getPicTextResult(attribute, getOutputElement, getTextInputElement.value);
	copyCodeToClipboard(attribute, getOutputElement);
}

function getPicTextResult(
	attribute: string,
	outputNode: HTMLElement,
	text: string,
): void {
	let imageText: string = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae placeat odit porro sint illo deserunt totam reiciendis voluptatibus qui dolores. Veritatis beatae eius minima aliquid blanditiis earum delectus itaque natus?Quisquam nihil hic tempora reprehenderit eum quam, illo voluptatem ex tenetur, cumque accusamus ipsum ad necessitatibus nobis, fuga voluptatum mollitia. Provident quas nam vero in, officiis explicabo est neque optio!Voluptas aperiam libero excepturi saepe praesentium! Quasi provident sapiente saepe, harum voluptate voluptatem incidunt animi nesciunt quis nam exercitationem at maiores dignissimos hic consequatur, et accusantium tempore natus enim fugiat.Aspernatur id atque accusantium ad delectus, praesentium minima voluptas iure quos repellat quo quaerat doloribus libero expedita, nisi`;

	const getImageButtonElement = <HTMLInputElement>(
		document.querySelector(`[data-button = ${attribute}]`)
	);

	getImageButtonElement.addEventListener('click', () => {
		if (outputNode === null) {
			return;
		}
		outputNode.style.background = `url(${imageSRC}) center no-repeat`;
		outputNode.style.backgroundSize = '400px';
		outputNode.style.backgroundClip = 'text';
		outputNode.style.webkitBackgroundClip = 'text';
		outputNode.style.webkitTextFillColor = 'rgba(255, 255, 255, 0.1)';
		if (text !== '') {
			imageText = text;
		}
		outputNode.innerText = imageText;
	});
}

function getImageFile(attribute: string): void {
	const getImageEntryElement = <HTMLInputElement>(
		document.getElementById(`${attribute}-file`)
	);

	FilePond.create(getImageEntryElement, {
		imagePreviewMaxHeight: 200,

		onpreparefile: (fileItem, output) => {
			// create a new image object
			const img = new Image();

			// set the image source to the output of the Image Transform plugin
			img.src = URL.createObjectURL(output);
			imageSRC = img.src;
			console.log(fileItem);
		},
	});
}

// function downloadImage(attribute: string): void {
// 	// const getDownloadImage = <HTMLElement>(
// 	// 	document.querySelector(`[data-download=${attribute}-image]`)
// 	// );
// 	// 	const getDownloadSvg = <HTMLElement>(
// 	// 		document.querySelector(`[data-download=${attribute}-svg]`)
// 	// 	);
// 	// getDownloadImage.addEventListener('click', () => {});
// }

function countForText(inputElement: HTMLInputElement): void {
	const countElement = <HTMLElement>document.querySelector('.count > span');
	inputElement.addEventListener('keydown', () => {
		countElement.innerText = `${inputElement.value.length + 1}`;
	});
}

function copyCodeToClipboard(
	attribute: string,
	outputElement: HTMLElement,
): void {
	const copyCodeButton = <HTMLElement>(
		document.querySelector(`[data-download=${attribute}-code]`)
	);
	copyCodeButton.addEventListener('click', () => {
		let codeToCopy: string = `
      div {
        background-position: ${outputElement.style.backgroundPosition};
        background-size: ${outputElement.style.backgroundSize};
        background-repeat: ${outputElement.style.backgroundRepeat};
        background-clip: ${outputElement.style.backgroundClip};
        -webkit-background-clip: ${outputElement.style.webkitBackgroundClip};
        -webkit-text-fill-color: ${outputElement.style.webkitTextFillColor};
      }
    `;
		navigator.clipboard.writeText(codeToCopy);
		alert('copied to clipboard');
	});
}
