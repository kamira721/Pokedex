var sun = new Image();
var moon = new Image();
var earth = new Image();

$(document).ready(function () {

  $.ajax({
    type: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/pikachu`,
    dataType: "json",
    success: function (response) {
          console.log(response);
          console.log(response.stats);
          response.stats.forEach(element => {
              console.log(element.base_stat);
          });          

          let infoPoke = response;
          var canvas = document.getElementById("nombre");
          var ctx = canvas.getContext("2d");
          ctx.font = "25px playfair";
          ctx.clearRect(0,0,300,300); // limpiar canvas
          ctx.strokeText(`${infoPoke.name}`,50,50);
          pokemon = `${infoPoke.sprites.front_default}`;

        $('#movimientos > ul').html("");
        infoPoke.moves.forEach((movimiento,index) => {
            $('#movimientos > ul').append(`
                <li>${index+1} - ${movimiento.move.name}</li>
            `);
        });
        $('input').val("");
        init(pokemon);
    
        let options = {
          title: {
            text: "Información de habilidades de Pokemones",
            fontColor: "#0000ff",
            fontSize: 30,
            padding: 10,
            margin: 15,
            backgroundColor: "#ffd700",
            borderThickness: 1,
            cornerRadius: 5,
            fontWeight: "bold",               
          },
           animationEnabled: true,
          data: [              
          {
            type: "column",
            dataPoints: [
              { label: "hp",  y: response.stats[0].base_stat },
              { label: "attack",  y: response.stats[1].base_stat },
              { label: "defense", y: response.stats[2].base_stat  },
              { label: "special-attack", y:response.stats[3].base_stat  },
              { label: "special-defense",  y: response.stats[4].base_stat  },
              { label: "speed",  y: response.stats[5].base_stat  }
            ]
          }
          ]
        };
        
      
        $("#chartContainer").CanvasJSChart(options);
    },
    error: function(error){
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'el número consultado no existe',
            footer: '<a href>Intente nuevamente</a>'
          })
        $('#mostraerPoke').html(`
        <p>El estado de la busqueda es ${error.status}</p>
        
    `)
    },
    
  });


/* ---------------------------------------------------------------------------------- */

  $('#buscando').on('click',()=>{
  
    let entrada = $('input').val();

    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${entrada}`,
        dataType: "json",
        success: function (response) {
              console.log(response);
              let infoPoke = response;
              var canvas = document.getElementById("nombre");
              var ctx = canvas.getContext("2d");
              ctx.font = "30px playfair";
              ctx.clearRect(0,0,300,300); // limpiar canvas
              ctx.strokeText(`${infoPoke.name}`,30,60);
              pokemon = `${infoPoke.sprites.front_default}`;

            $('#movimientos > ul').html("");
            infoPoke.moves.forEach((movimiento,index) => {
                $('#movimientos > ul').append(`
                    <li>${index+1} - ${movimiento.move.name}</li>
                `);
            });
            $('input').val("");
            init(pokemon);
            let options = {
              title: {
                text: "Información de habilidades de Pokemones",
                fontColor: "#0000ff",
                fontSize: 30,
                padding: 10,
                margin: 15,
                backgroundColor: "#ffd700",
                borderThickness: 1,
                cornerRadius: 5,
                fontWeight: "bold",               
              },
               animationEnabled: true,
              data: [              
              {
                type: "column",
                dataPoints: [
                  { label: "hp",  y: response.stats[0].base_stat },
                  { label: "attack",  y: response.stats[1].base_stat },
                  { label: "defense", y: response.stats[2].base_stat  },
                  { label: "special-attack", y:response.stats[3].base_stat  },
                  { label: "special-defense",  y: response.stats[4].base_stat  },
                  { label: "speed",  y: response.stats[5].base_stat  }
                ]
              }
              ]
            };
            
          
            $("#chartContainer").CanvasJSChart(options);

        },
        error: function(error){
          console.error(error);
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'el número consultado no existe',
              footer: '<a href>Intente nuevamente</a>'
            })
          $('#mostraerPoke').html(`
          <p>El estado de la busqueda es ${error.status}</p>
      `)
          
      }

    });
});

/* ----------------------------------------------------------------------------------- */

function init(pokemon){
  sun.src = pokemon;
  moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  earth.src = './asset/img/Pokeball.png';
  window.requestAnimationFrame(draw);
}

function draw() {
  var ctx = document.getElementById('poke_solar').getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0,0,300,300); // limpiar canvas

  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.strokeStyle = 'rgba(0,153,255,0.4)';
  ctx.save();
  ctx.translate(150,150);
  

  // La tierra
  var time = new Date();
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
  ctx.translate(105,0);
  ctx.drawImage(earth,-12,-12);
  ctx.restore();
  ctx.beginPath();
  ctx.arc(150,150,105,0,Math.PI*2,false); // Órbita terrestre
  ctx.stroke();
  ctx.drawImage(sun,0,0,300,300);
  window.requestAnimationFrame(draw);
}
});
