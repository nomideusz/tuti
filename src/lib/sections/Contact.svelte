<script>
  import PlainText from '$lib/components/PlainText.svelte';
  import bgContact from '$lib/images/originals/400px_bg_contact.jpg?format=avif';
  import bgContactMobile from '$lib/images/originals/400px_bg_contact.jpg?rotate=90&format=avif';
  import Img from '@zerodevx/svelte-img';
  import logo_saw from '$lib/images/logo_saw.png?w=300&as=run:0';

  export let contact;
</script>

<div
  class="grid heading-wrapper h-fit w-full lg:w-[17.5dvw] lg:min-h-screen text-white bg-no-repeat bg-cover bg-left py-[7.7dvw]"
  style="--bg-img: url({bgContact}); --bg-img-mobile: url({bgContactMobile})"
>
  <h2 class="place-self-center uppercase font-bold tracking-[0.2em] text-[8dvw] lg:text-[5.5dvw]">
    Kontakt
  </h2>
</div>
<div class="flex flex-col lg:flex-row items-center grow py-16 lg:py-24">
  <article class="mx-auto px-[6dvi] flex flex-col">
    <div class="text-center flex flex-col items-center justify-center">
      <!-- LOGO -->
      <a
        class="flex flex-col justify-start leading-none text-center text-white"
        href="#start"
        title="Tutitutu. Architektura wnętrz."
      >
        <span
          class="block align-top uppercase tracking-[0.05em] font-rounded"
          style="font-size: clamp(2.8rem, calc(2.4dvw * 2), 5rem);">tutitutu</span
        >
        <span
          class="block align-top tracking-[0.13em]"
          style="font-size: clamp(1.06rem, calc(2.4dvw * 0.76), 1.9rem);">architektura wnętrz</span
        >
      </a>
      <!-- END LOGO -->
      <ul class="mt-8 lg:mt-[3.9dvw]">
        <li>
          <h2 class="big leading-10 lg:leading-[3.6dvw] font-bold uppercase">
            <PlainText bind:content={contact.name} />
          </h2>
        </li>
        <li>
          <h3 class="small leading-6 lg:leading-[3dvw]">
            <PlainText bind:content={contact.title} />
          </h3>
        </li>
        <li
          class="big leading-10 lg:leading-[3.6dvw] flex justify-center my-6 lg:my-[2.5dvi] font-bold"
        >
          <a class="flex justify-center" href={`https://wa.me/${contact.phone.replace(/\s+/g, '')}`}
            ><span class="inline-block">+</span><PlainText bind:content={contact.phone} /></a
          >
        </li>
        <li class="small leading-8 lg:leading-[3dvw] flex justify-center">
          e-mail:&nbsp;<a href={`mailto:${contact.email}`}
            ><PlainText bind:content={contact.email} /></a
          >
        </li>
        <li
          class="small leading-8 lg:leading-[3dvw] flex flex-col sm:flex-row gap-0 sm:gap-4 justify-center items-center"
        >
          <span>
            <PlainText bind:content={contact.address1} />
          </span>
          <span>
            <PlainText bind:content={contact.address2} />
          </span>
        </li>
      </ul>
      <div class="mt-[3.9dvw] gap-6 flex justify-center">
        <p class="lg:text-[1.4dvw] uppercase mt-4 sm:mt-3 tracking-wider">członek</p>
        <Img
          src={logo_saw}
          class="w-[40dvw] md:w-[30dvw] lg:w-[18dvw]"
          alt="SAW Stowarzyszenie Architektów Wnętrz"
        />
      </div>
    </div>
  </article>

  <ul
    class="social gap-5 lg:gap-[1.6dvw] flex flex-row lg:flex-col items-center justify-center lg:w-[17.5dvw] xl:w-[14dvw] pt-8 lg:pt-0"
  >
    <li>
      <a
        href="https://www.facebook.com/profile.php?id=100082816960486"
        target="_blank"
        class="inline-flex justify-center items-center w-[7dvw] h-[7dvw] md:w-[6dvw] md:h-[6dvw] lg:w-[4dvw] lg:h-[4dvw] xl:w-[60px] xl:h-[60px] rounded-full text-primary text-[3.4dvw] sm:text-[3dvw] lg:text-[1.8dvw] font-bold"
      >
        f
      </a>
    </li>
    <li>
      <a
        href="https://www.instagram.com/tutitutu.wnetrza/"
        target="_blank"
        class="inline-flex justify-center items-center w-[7dvw] h-[7dvw] md:w-[6dvw] md:h-[6dvw] lg:w-[4dvw] lg:h-[4dvw] xl:w-[60px] xl:h-[60px] rounded-full text-primary text-[3.4dvw] sm:text-[3dvw] lg:text-[1.8dvw] font-bold"
      >
        i
      </a>
    </li>
    <li>
      <a
        href="https://www.linkedin.com/in/maria-kowalewska-786767229/"
        target="_blank"
        class="inline-flex justify-center items-center w-[7dvw] h-[7dvw] md:w-[6dvw] md:h-[6dvw] lg:w-[4dvw] lg:h-[4dvw] xl:w-[60px] xl:h-[60px] rounded-full text-primary text-[3.4dvw] sm:text-[3dvw] lg:text-[1.8dvw] font-bold"
      >
        L
      </a>
    </li>
    <li>
      <a
        href="https://pl.pinterest.com/tutitutu_wnetrza/"
        target="_blank"
        class="inline-flex justify-center items-center w-[7dvw] h-[7dvw] md:w-[6dvw] md:h-[6dvw] lg:w-[4dvw] lg:h-[4dvw] xl:w-[60px] xl:h-[60px] rounded-full text-primary text-[3.4dvw] sm:text-[3dvw] lg:text-[1.8dvw] font-bold"
      >
        P
      </a>
    </li>
  </ul>
</div>

<style>
  .big {
    font-size: clamp(2rem, calc(3.4dvw), 7rem);
  }

  .small {
    font-size: clamp(1.6rem, calc(2.4dvw), 5rem);
  }

  @media (min-width: 960px) {
    .heading-wrapper {
      background-image: var(--bg-img);
    }
    .heading-wrapper h2 {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
    }
  }

  @media (max-width: 959px) {
    .heading-wrapper {
      background-image: var(--bg-img-mobile);
    }
  }

  article li a {
    @apply transition duration-200 text-white;
  }
  article li a:hover {
    @apply duration-300 text-gray-light;
  }

  .social li a {
    @apply transition duration-200 bg-gray-light;
  }
  .social li a:hover {
    @apply duration-300 bg-white;
  }
</style>
