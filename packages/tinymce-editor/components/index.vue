<template>
  <div>
    <ae-tinymce></ae-tinymce>
    <ae-button @click="{clickHandler}">Check</ae-button>
    <ae-gutter></ae-gutton>
  </div>
</template>

<script lang="ts">
import TinyMCE from './tinymce';
import Button from './button';
import Gutter from './gutter';

export default {
  name: 'accessible-editor',
  setup() {
    const clickHandler = async () => {
      const result = fetch('http://localhost:3000/');
      const json = result.json();
      
      console.log(json);
    }
    return {
      clickHandler
    }
  }
}
</script>