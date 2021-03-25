const totalButton = document.querySelectorAll('.number');
let etapaIndex = 0;
let numerosTela = document.querySelector('.d-1-3');
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let buttonVotos = document.querySelectorAll('.numero');
const confirma = document.querySelector('.botao--confirma');
const tela = document.querySelector('.tela');
let avisoGrande = document.querySelector('.aviso--grande pisca');
let votos = [];
let confirmaCondi = false;

const addClass = index => {
    buttonVotos.forEach(item=> {
        item.classList.remove('pisca')
    })

    buttonVotos[index].classList.add('pisca')
}

const updateTela = (limit, select) => {
    avisoGrande = document.querySelector('.aviso--grande pisca');
    numerosTela = document.querySelector('.d-1-3');
    seuVotoPara = document.querySelector('.d-1-1 span');
    cargo = document.querySelector('.d-1-2 span');
    descricao = document.querySelector('.d-1-4');
    aviso = document.querySelector('.d-2');
    lateral = document.querySelector('.d-1-right');
    if(avisoGrande){
        avisoGrande.innerHTML = ''
    }
  

    let numeroPisca = '';


    for (let index = 1; index < limit; index++) {
        
        if(index == select ){
            numeroPisca+= '<div class="numero pisca"></div>';
        }

            numeroPisca += '<div class="numero"></div>';
        
    }
   
    numerosTela.innerHTML = numeroPisca;
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapas[etapaIndex].titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    buttonVotos = document.querySelectorAll('.numero');
}

const feedBackClient = (items,candidato) =>{
    let htmlCand = ''
    if(candidato){
        htmlCand = `<div class="d-1">
        <div class="d-1-left">
            <div class="d-1-1">
                <span style="display: block;">SEU VOTO PARA</span>
            </div>
            <div class="d-1-2">
                <span>${etapas[etapaIndex].titulo}</span>
            </div>
            <div class="d-1-3">
                ${items.map(item=> `<div class="numero">${item}</div>`).join('')}
            </div>
            <div class="d-1-4">Nome: ${candidato.nome}<br>Partido: ${candidato.partido}</div>
        </div>
        <div class="d-1-right"><div class="d-1-image"><img src="images/${candidato.fotos[0].url}" alt="">${candidato.fotos[0].legenda}</div></div>
    </div>
    <div class="d-2" style="display: block;">
        Aperte a tela:<br>
        CONFIRMA para CONFIRMAR este voto<br>
        CORRIGE para REINICIAR este voto
    </div>`
    }else{
       

    htmlCand =  `
    
    <div class="d-1">
    <div class="d-1-left">
        <div class="d-1-1">
            <span style="display: block;">SEU VOTO PARA</span>
        </div>
        <div class="d-1-2">
            <span>${etapas[etapaIndex].titulo}</span>
        </div>
        <div class="d-1-3">
        
            ${items.map(item=> `<div class="numero">${item}</div>`).join('')}
        </div>
        <div class="d-1-4"><div class="aviso--grande pisca">VOTO NULO</div></div>
    </div>
    <div class="d-1-right"></div>
</div>
<div class="d-2" style="display: block;">
    Aperte a tela:<br>
    CONFIRMA para CONFIRMAR este voto<br>
    CORRIGE para REINICIAR este voto
</div>`
    }


    tela.innerHTML = htmlCand;
}

const montaTelaCandidato = candidato => {

    let lateralHTML = 
    `<div class="d-1-image small"><img src="images/${candidato.fotos[0].url}" alt="" />${candidato.fotos[0].legenda}</div>`;
    ;

    lateral.innerHTML = lateralHTML;

}

const verificaCandidato = ()=>{
    let candidato = null;
    etapas[etapaIndex].candidatos.forEach(item=>{
        console.log(item.numero == votos.join(''))
        if(item.numero == votos.join('')){
            candidato = item;
        }
    })

 
    if(candidato){
        return candidato;
    }

    return candidato;
    
}

const confirmValidade = ()=> {

    confirmaCondi = true;
    
    
    if(votos.length == etapas[etapaIndex].numeros && confirmaCondi){
        
        
        if(etapaIndex < etapas.length){
            etapaIndex++;
            votos = []
            console.log(etapaIndex)
            if(etapaIndex > etapas.length - 1){
                tela.innerHTML = "<div class='aviso--gigante pisca'>FIM</div>"
            }else{
                updateTela(etapas[etapaIndex].numeros, 1)

            }


        }
        

    }
}

const clickButtonEvent = event => {
    
   


    if(votos.length - 1 < etapas[etapaIndex].numeros - 1){
        const buttonMoment = event.target.textContent
        const btChange =  buttonVotos[votos.length]
        btChange.innerHTML = buttonMoment
        votos.push(buttonMoment)
        addClass(votos.length - 1)
    }

    if(votos.length - 1 == etapas[etapaIndex].numeros - 1){
        let candidato = verificaCandidato();
     

            if(candidato){
                feedBackClient(votos, candidato);
            }else{
                feedBackClient(votos, null);

            }
        
    }

}

confirma.addEventListener('click',confirmValidade)

totalButton.forEach(button=> {
    button.addEventListener('click',clickButtonEvent)
})



updateTela(etapas[etapaIndex].numeros, votos.length + 1)