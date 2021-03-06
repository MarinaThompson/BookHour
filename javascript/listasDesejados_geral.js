const todoContainer = document.getElementById('todo-container');

// checando se o usuário está logado
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user is signed in at users.html');
    }
    else {
        alert('Você foi desconectado, faça o login para se reconectar');
        location = "../views/login.html";
    }
})

// Adicionando na primeira lista //
function renderData(individualDoc) {

    // parent div
    let parentDiv = document.createElement("div");
    parentDiv.className = "container todo-box";
    parentDiv.setAttribute('data-id', individualDoc.id);

    // todo div
    let todoDiv = document.createElement("div");
    todoDiv.textContent = individualDoc.data().todos || 
    individualDoc.data().desejo_button 
    || individualDoc.data().desejo_hp2 
    || individualDoc.data().HP3_desejo 
    || individualDoc.data().HP4_desejo 
    || individualDoc.data().HP5_desejo 
    || individualDoc.data().HP6_desejo 
    || individualDoc.data().HP7_desejo 
    || individualDoc.data().tortoArado_desejo
    || individualDoc.data().homemBabilonia_desejo
    || individualDoc.data().garotaLago_desejo
    || individualDoc.data().mulheresLobo_desejo
    || individualDoc.data().PJ1_desejo
    || individualDoc.data().PJ2_desejo
    || individualDoc.data().PJ3_desejo
    || individualDoc.data().PJ4_desejo
    || individualDoc.data().PJ5_desejo
    || individualDoc.data().revolucaoBichos_desejo
    || individualDoc.data().livro1984_desejo
    || individualDoc.data().handmaids_desejo
    || individualDoc.data().milagreManha_desejo   
    || individualDoc.data().poderAcao_desejo
    || individualDoc.data().mindset_desejo
    || individualDoc.data().poderHabito_desejo
    || individualDoc.data().mentirosos_desejo
    || individualDoc.data().sutilArte_desejo
    || individualDoc.data().manualAntirracista_desejo
    || individualDoc.data().coragemImperfeito_desejo
    || individualDoc.data().ventosUivantes_desejo
    || individualDoc.data().orgulhoPreconceito_desejo
    || individualDoc.data().iluminado_desejo
    || individualDoc.data().it_desejo;





    // button
    let trash = document.createElement("button");

    let i = document.createElement("i");
    i.className = "fas fa-trash";

    // appending
    trash.appendChild(i);

    parentDiv.appendChild(todoDiv);
    parentDiv.appendChild(trash);

    todoContainer.appendChild(parentDiv);

    // trash clicking event
    trash.addEventListener('click', e => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('Livros desejados' + user.uid).doc(id).delete();
            }
        })
    })
}

// adding todos to firestore database
const form = document.getElementById('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const todos = form['todos'].value;
    // console.log(todos);
    let id = counter += 1;
    form.reset();
    auth.onAuthStateChanged(user => {
        if (user) {
         fs.collection('Livros desejados' + user.uid).doc('_' + id).set({
                id: '_' + id,
                todos
            }).then(() => {
                console.log('todo added');
            }).catch(err => {
                console.log(err.message);
            })
        }
        else {
            // console.log('user is not signed in to add todos');
        }
    })
})

// realtime listners
auth.onAuthStateChanged(user => {
    if (user) {
        fs.collection('Livros desejados' + user.uid).onSnapshot((snapshot) => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type == "added") {
                    renderData(change.doc);
                }
                else if (change.type == 'removed') {
                    let li = todoContainer.querySelector('[data-id=' + change.doc.id + ']');
                    todoContainer.removeChild(li);
                }
            })
        })
    }
})



