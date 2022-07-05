import * as FilePond from 'filepond';

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
const pond = FilePond.create(imageElement);
console.log(pond);

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
