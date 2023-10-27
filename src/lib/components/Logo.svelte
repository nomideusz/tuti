<script>
  export let size = 'lg';
  export let color = 'primary';
  let logoSize = '';
  let sloganSize = '';

  $: {
      switch (size) {
          case 'sm':
              logoSize = 'text-[1.75em] md:text-[2.65em]';
              sloganSize = 'text-[0.66em] md:text-[1em]';
              break;
          case 'md':
              logoSize = 'text-[2.65em] md:text-[3em] xl:text-[3.3em]';
              sloganSize = 'text-[1em] md:text-[1.13em] xl:text-[1.24em]';
              break;
          case 'lg':
              logoSize = 'text-[3em] md:text-[3.3em]';
              sloganSize = 'text-[1.13em] xl:text-[1.24em]';
              break;
          default:
              logoSize = 'text-[3em]';
              sloganSize = 'text-[1.13em]';
              break;
      }
  }
</script>

<a class="leading-none text-center text-{color}" href="/#start" title="Tutitutu. Architektura wnętrz.">
        <span class={`block align-top uppercase font-rounded ${logoSize}`}>tutitutu</span>
        <span class={`block align-top tracking-[0.13em] ${sloganSize}`}>architektura wnętrz</span>
</a>
