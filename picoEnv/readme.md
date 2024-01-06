# Pico
based on [Pico 1.5.10](https://github.com/picocss/pico), Pico provides
a Model-View-Controller scheme for building HTML with CSS and JS using 
Bash environment variable substitution.

## Main Features
- No NPM or other package managers
- CSS first, using Pico.CSS conventions
- Model is LocalStorage
- Controllers handle input actions, change model
- Views subscribe to Model

```
A -> C -> M -> M
              ---> V1
              ---> V2

```

## Views
Views are defined in .pico files and contain $ENV_VARIABLES
which are inserted using the Unix command envsub. Like a 
.svelte file, .pico files define style, html and JS code
in one file, aka, a Pico component.

```
<style>
.thumbpad{
  width:3rem;
  height:3rem;
  border:1px solid blue;
}

</style>
<div class="thumbpad">
thumbpad
</div>
<script>

</script>
```
