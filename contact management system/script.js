document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactTableBody = document.getElementById('contactTableBody');

    // Handle form submission for adding a contact
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;

            if (name && phone) {
                addContact(name, phone);
                contactForm.reset();
            }
        });
    }

    // Load contacts and display in the table
    if (contactTableBody) {
        loadContacts();
    }

    function addContact(name, phone) {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push({ name, phone });
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    function loadContacts() {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.forEach(contact => addContactToTable(contact.name, contact.phone));
    }

    function addContactToTable(name, phone) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${phone}</td>
            <td><button class="delete" onclick="deleteContact('${name}', '${phone}')">Delete</button></td>
        `;
        contactTableBody.appendChild(row);
    }

    window.deleteContact = function(name, phone) {
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts = contacts.filter(contact => contact.name !== name || contact.phone !== phone);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        // Refresh the contact list on the page
        contactTableBody.innerHTML = '';
        loadContacts();
    };
});
