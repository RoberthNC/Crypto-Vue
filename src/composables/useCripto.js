import { computed, ref, onMounted } from "vue";

export default function useCripto(){

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ]);

    const cotizacion = ref({});

    const cargando = ref(false);

    const criptomonedas = ref([]);

    onMounted(()=>{
        fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
          .then(response => response.json())
          .then(({Data}) => criptomonedas.value = Data)
    });

    const obtenerCotizacion = async cotizar => {
        cargando.value = true;
        cotizacion.value = {};
        try {
          const { criptomoneda, moneda } = cotizar;
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      
          const response = await fetch(url);
          const data = await response.json();
      
          cotizacion.value = data.DISPLAY[criptomoneda][moneda];
        } catch (error) {
          console.log(error);
        } finally{
          cargando.value = false;
        }
    }

    const mostrarResultado = computed(() => Object.values(cotizacion.value).length > 0);

    return {
        monedas,
        criptomonedas,
        cargando,
        cotizacion,
        obtenerCotizacion,
        mostrarResultado
    }

}