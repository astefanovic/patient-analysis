
import patientRowTemplate from 'bundle-text:./patientRowTemplate.html';
import { Patient, Status, Relevance } from './types';

const patientData: Patient[] = [
    {
        date: '11/11/2022',
        firstName: 'Jane',
        lastName: 'Doe',
        dob: '11/11/1972',
        medicareId: '12345',
        rawData: 'Raw data 1',
        processedData: 'Processed data 1',
        response: 'AI response 1',
        status: Status.Completed,
        relevance: Relevance.Relevant
    },
    {
        date: '22/10/2022',
        firstName: 'John',
        lastName: 'Smith',
        dob: '22/10/1980',
        medicareId: '67890',
        rawData: 'Raw data 2',
        processedData: '',
        response: '',
        status: Status.ProcessingError,
        relevance: ''
    },
    {
        date: '22/10/2022',
        firstName: 'James',
        lastName: 'Smith',
        dob: '22/10/1990',
        medicareId: '09876',
        rawData: 'Raw data 3',
        processedData: 'AI response 3',
        response: '',
        status: Status.AnalysisError,
        relevance: ''
    },
    // To be retrieved by api calls
];

const tableBody = document.getElementById('patientTableBody') as HTMLTableSectionElement;
const dataModal = document.getElementById('dataModal') as HTMLDialogElement;
const modalTitle = document.getElementById('modalTitle') as HTMLHeadingElement;
const modalContent = document.getElementById('modalContent') as HTMLTextAreaElement;
const saveButton = document.getElementById('saveButton') as HTMLButtonElement;

// Initial render
renderPatientData(patientData, tableBody).catch(error => console.error('Error rendering patient data:', error));

//Methods
async function loadTemplate(): Promise<void> {
    const templateContainer = document.getElementById('template-container');
    if (templateContainer) {
        templateContainer.innerHTML = patientRowTemplate;
    }
}

async function renderPatientData(patientData: Patient[], tableBody: HTMLTableSectionElement): Promise<void> {
    await loadTemplate();
    const template = document.getElementById('patient-row-template') as HTMLTemplateElement;
    tableBody.innerHTML = '';

    patientData.forEach((patient, index) => {
        const row = template.content.cloneNode(true) as HTMLTableRowElement;

        // Fill in the basic data
        (row.querySelector('[data-field="date"]') as HTMLTableCellElement).textContent = patient.date;
        (row.querySelector('[data-field="firstName"]') as HTMLTableCellElement).textContent = patient.firstName;
        (row.querySelector('[data-field="lastName"]') as HTMLTableCellElement).textContent = patient.lastName;
        (row.querySelector('[data-field="dob"]') as HTMLTableCellElement).textContent = patient.dob;
        (row.querySelector('[data-field="medicareId"]') as HTMLTableCellElement).textContent = patient.medicareId;
        (row.querySelector('[data-field="status"]') as HTMLTableCellElement).textContent = patient.status;

        // Handle raw data
        (row.querySelector('[data-action="edit-view-raw"]') as HTMLButtonElement).onclick = () => editViewData('rawData', index);

        // Handle processed data
        const processedDataCell = row.querySelector('[data-field="processedData"]') as HTMLTableCellElement; 
        if (patient.status === Status.ProcessingError) {
            processedDataCell.innerHTML = `<div class="badge badge-error">Error</div>`;
        } else if (patient.processedData) {
            (processedDataCell.querySelector('[data-action="edit-view-processed"]') as HTMLButtonElement).onclick = () => editViewData('processedData', index);
        } else {
            processedDataCell.innerHTML = '';
        }
        

        // Handle response
        const responseCell = row.querySelector('[data-field="response"]') as HTMLTableCellElement;
        if (patient.status === Status.AnalysisError) {
            responseCell.innerHTML = `<div class="badge badge-error">Error</div>`;
        } else if (patient.response) {
            (responseCell.querySelector('[data-action="edit-view-response"]') as HTMLButtonElement).onclick = () => editViewData('response', index);
        } else {
            responseCell.innerHTML = '';
        }

        // Handle relevance
        const relevanceSelect = row.querySelector('[data-action="update-relevance"]') as HTMLSelectElement;
        if (patient.status === Status.Completed) {
            relevanceSelect.value = patient.relevance;
            relevanceSelect.onchange = (e) => updateRelevance(index, (e.target as HTMLSelectElement).value as Relevance);
        } else {
            relevanceSelect.parentNode?.removeChild(relevanceSelect);
        }

        // Handle actions
        (row.querySelector('[data-action="rerun"]') as HTMLButtonElement).onclick = () => rerunAnalysis(index);
        (row.querySelector('[data-action="delete"]') as HTMLButtonElement).onclick = () => deleteRecord(index);

        tableBody.appendChild(row);
    });
}

function editViewData(field: keyof Patient, index: number): void {
    const patient = patientData[index];
    modalTitle.textContent = `Edit/View ${field.charAt(0).toUpperCase() + field.slice(1)}`;
    modalContent.value = patient[field];
    
    saveButton.onclick = () => {
        patient[field] = modalContent.value;
        renderPatientData(patientData, tableBody);
        dataModal.close();
    };
    
    dataModal.showModal();
}

function updateRelevance(index: number, value: Relevance): void {
    patientData[index].relevance = value;
}

function rerunAnalysis(index: number): void {
    alert(`Rerunning analysis for patient ${patientData[index].firstName} ${patientData[index].lastName}`);
    // Implement rerun logic here
}

function deleteRecord(index: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
        patientData.splice(index, 1);
        renderPatientData(patientData, tableBody);
    }
}

