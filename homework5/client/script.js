const addBtn = document.getElementById("add");
const exportPdfBtn = document.getElementById("exportPdf");
const exportTxtBtn = document.getElementById("exportTxt");

const notesContainer = document.body;

document.addEventListener('DOMContentLoaded', displayNotes);

addBtn.addEventListener("click", () => {
    addNewNote();
});

exportPdfBtn.addEventListener("click", () => {
    exportNotesToPdf();
});

exportTxtBtn.addEventListener("click", () => {
    exportNotesToTxt();
});

function addNewNote() {
    fetch('http://localhost:2203/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: '',
            content: '',
        }),
    })
    .then(response => response.json())
    .then(data => {
        const noteInfo = {
            id: data.id,
            title: '',
            content: '',
        };
        addNewNoteElement(noteInfo);
    })
    .catch(error => console.error('Error:', error));
}

function addNewNoteElement(noteInfo) {
    createNoteElement(noteInfo.id, noteInfo.title, noteInfo.content);
}

function displayNotes() {
    fetch('http://localhost:2203/api/notes')
        .then(response => response.json())
        .then(data => {
            const notes = data.notes;
            if (notes.length > 0) {
                notes.forEach(note => {
                    createNoteElement(note.id, note.title, note.content);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

function createNoteElement(id, title, text) {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <input type="text" class="title" placeholder="Enter title" value="${title}" />
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}">${text}</textarea>
        </div>
    `;

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");

    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");
    const titleInput = note.querySelector(".title");

    textArea.value = text;
    main.innerHTML = marked(text);

    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener("click", () => {
        note.remove();
        deleteNoteFromDatabase(id);
    });

    titleInput.addEventListener("input", () => {
        updateNoteInDatabase(id, titleInput.value, textArea.value);
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateNoteInDatabase(id, titleInput.value, textArea.value);
    });

    notesContainer.appendChild(note);
}

function updateNoteInDatabase(id, title, text) {
    fetch(`http://localhost:2203/api/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            content: text,
        }),
    })
    .then(response => response.json())
    .then(data => console.log('Note updated successfully'))
    .catch(error => console.error('Error:', error));
}

function deleteNoteFromDatabase(id) {
    fetch(`http://localhost:2203/api/notes/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => console.log('Note deleted successfully'))
    .catch(error => console.error('Error:', error));
}



function exportNotesToPdf() {
    const notesContainer = document.body.cloneNode(true);

    const toolsButtons = notesContainer.querySelectorAll(".tools button");
    toolsButtons.forEach((button) => {
        button.style.display = "none";
    });

    // Use html2pdf library
    html2pdf(notesContainer)
        .from(notesContainer)
        .set({
            margin: 10,
            filename: 'notes.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .outputPdf();
}

function exportNotesToTxt() {
    const notesTextArray = [];

    const notes = document.querySelectorAll(".note");

    notes.forEach((note) => {
        const title = note.querySelector(".title").value;
        const text = note.querySelector("textarea").value;
        notesTextArray.push(`Title: ${title}\n${text}\n\n`);
    });

    const notesText = notesTextArray.join("\n");

    const blob = new Blob([notesText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
