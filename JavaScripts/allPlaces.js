const xmlhttp = new XMLHttpRequest();
const url = 'https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72';

xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let myArr = JSON.parse(this.responseText);
    displayPlaces(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();


function showValor(i) {
  let result = calcEstadia(i);
  let out = "";
  out += `<h6>Valor Total: ${result},00 R$
            <p>
              <button> Confirmar </button>            
            </p>
          </h6>`
  document.getElementById(`pricePlace_${i}`).innerHTML = out;
}

function converteData(data) {
  const dataSplit = data.split('/');
  const day = dataSplit[0];
  const month = dataSplit[1];
  const year = dataSplit[2];

  data = new Date(year, month - 1, day);
  return data;
}   

function calcEstadia(i) {
  let data = document.getElementById(`docPrice_${i}`).innerHTML.split(' ');
  let valorDiaria = parseInt(data[1]);
  console.log(valorDiaria);
  console.log(valorDiaria * calcTime(i));
  return valorDiaria * calcTime(i);
}

function calcTime(i) {
  let dataAux = document.getElementById(`object_${i}_DateIn`).value + ' 12:30';
  let data1 = new Date(dataAux);

  dataAux = document.getElementById(`object_${i}_DateOut`).value + ' 12:30';
  let data2 = new Date(dataAux);

  const diff = Math.abs(data1.getTime() - data2.getTime());
  console.log(Math.ceil(diff / (1000 * 60 * 60 * 24)));
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function askDate(i) {
  let out = "";
  out += `<p>
          <label for="dateIn" id="object_${i}">Entrada: </label>
          <input type="date" id="object_${i}_DateIn" placeholder="dd/mm/aaaa" >
          </p>
          <p>
          <label for="dateOut" id="object_${i}">Saida: </label>
          <input type="date" id="object_${i}_DateOut" placeholder="dd/mm/aaaa" >
          <button id="confereData" onclick="showValor(${i})"> Conferir</>
          </p>`;
  document.getElementById(`agendarButton_${i}`).style.display = 'none';
  document.getElementById(`pricePlace_${i}`).innerHTML = out;
}



function displayPlaces(arr) {
    let out = "";
    for (let i = 0; i < arr.length ; i++) {
                out += `<div class="col-md-4">
                <img src="${arr[i].photo}" alt="${arr[i].name}" class="card-img-top img-card-offers" height="160px" width="240px">
                <div class="card-header">
                    <h5>${arr[i].name}</h5>
                    <p>${arr[i].property_type}</p>
                </div>
                <div class="card-body">
                    <h5 class="card-title" id="docPrice_${i}" >R$ ${arr[i].price}.00</h5>
                </div>
                <div class="card-botton">
                    <button id="agendarButton_${i}" onclick="askDate(${i})" >
                    Agendar!
                    </button>
                    <p id="pricePlace_${i}">------</p>
                    
                </div>
              </div>`;
    }
    document.getElementById("ofertas").innerHTML = out;
  }