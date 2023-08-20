<script setup>
  import { ref, reactive } from 'vue';
  import Alerta from "./components/Alerta.vue";
  import Spinner from "./components/Spinner.vue";
  import Cotizacion from "./components/Cotizacion.vue";
  import useCripto from "./composables/useCripto.js";

  const { monedas, criptomonedas, cargando, cotizacion, obtenerCotizacion, mostrarResultado } = useCripto();

  const error = ref("");

  const cotizar = reactive({
    moneda:"",
    criptomoneda:""
  });

  const cotizarCripto = () => {
    if(Object.values(cotizar).includes("")){
      error.value = "TODOS LOS CAMPOS SON OBLIGATORIOS";
      return;
    }
    error.value = "";
    obtenerCotizacion(cotizar);
  }
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>

    <div class="contenido">
      <Alerta v-if="error">
        {{ error }}
      </Alerta>
      <form @submit.prevent="cotizarCripto" class="formulario">
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select 
            id="moneda"
            v-model="cotizar.moneda"
          >
            <option value="">-- Seleccione --</option>
            <option 
              v-for="moneda in monedas" 
              :value="moneda.codigo"
            >{{ moneda.texto }}</option>
          </select>
        </div>

        <div class="campo">
          <label for="criptomoneda">Criptomoneda:</label>
          <select 
            id="criptomoneda"
            v-model="cotizar.criptomoneda"
          >
            <option value="">-- Seleccione --</option>
            <option 
              v-for="criptomoneda in criptomonedas" 
              :value="criptomoneda.CoinInfo.Name"
            >{{ criptomoneda.CoinInfo.FullName }}</option>
          </select>
        </div>

        <input type="submit" value="Cotizar">
      </form>

      <Spinner
        v-if="cargando"
      />

      <Cotizacion
        v-if="mostrarResultado"
        :cotizacion="cotizacion"
      />

    </div>
  </div>
</template>