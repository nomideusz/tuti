<script>
  import { fetchJSON } from '$lib/util';
  import PrimaryButton from '$lib/components/PrimaryButton.svelte';
  import LoginMenu from '$lib/components/LoginMenu.svelte';
  import { currentUser, isEditing } from '$lib/stores.js';
  import WebsiteHeader from '$lib/components/WebsiteHeader.svelte';
  import Workshop from '$lib/sections/Workshop.svelte';
  import Publications from '$lib/sections/Publications.svelte';
  import Contact from '$lib/sections/Contact.svelte';
  import Realisations from '$lib/sections/Realisations.svelte';
  import References from '$lib/sections/References.svelte';
  import Img from '@zerodevx/svelte-img';
  import mmdesktop from '$lib/images/originals/m.jpg?as=real';
  import mmMobile from '$lib/images/originals/m.jpg?as=real';
  import placeholder from '$lib/images/previews/m.svg';
  import NotEditable from '$lib/components/NotEditable.svelte';
  import { Scrollactive } from 'svelte-scrollactive';
  import { browser } from '$app/environment';
  import { navigating } from '$app/stores';
  import { windowSizeStore } from 'svelte-legos';
  import { locale } from 'svelte-i18n';
  import { get } from 'svelte/store';
  import { _ } from 'svelte-i18n';
  const size = windowSizeStore();
  export let data;

  import { analyticsStore } from '$lib/stores.js';

  const new_event = {
    id: 'any-random-id',
    data: {}, //anything you want to send to GA,
    event: 'name-of-your-event',
    type: 'event'
  };
  analyticsStore.update(existing_events => [...existing_events, new_event]);
  // --------------------------------------------------------------------------
  // DEFAULT PAGE CONTENT - AJDUST TO YOUR NEEDS
  // --------------------------------------------------------------------------

  const WORKSHOP_PLACEHOLDER = `
  <p>
      Jestem absolwentką wydziału Architektury Wnętrz warszawskiej Akademii Sztuk Pięknych oraz
      Grafiki na University of Brighton, Wlk.&nbsp;Brytania.<br />
      Pracownię <span>TUTITUTU</span> założyłam w 1997 roku.<br
      />
      W moim dorobku są projekty wnętrz willi, apartamentów, kawiarni, biur, miejsc użyteczności publicznej
      (w tym sieć salonów jednego z największych dealerów samochodowych w Polsce) a także elewacji budynków
      mieszkalnych i biurowych.
    </p>
    <p>
      Moja praca to spełnianie marzeń. Marzenia są najważniejsze! Od ponad dwóch dekad przekładam
      nawet najitymniejsze marzenia moich Klientów na rzeczywistość. Tworzę wnętrza o niebanalnym i
      niepowtarzalnym charakterze chojnie wzbogaconym o moją estetykę, wiedzę i doświadczenie.
    </p>
    <p>
      Każde, nawet minimalistyczne wnętrze, ma swój detal o który trzeba zadbać tak samo troskliwie
      jak o inne elementy wystroju, by uzyskać harmonię i jakość. By to osiągać współpracuję z
      najlepszymi rzemieślnikami, a dzięki nim najśmielszy projekt udaje mi się przełożyć na
      rzeczywistość.
    </p>
    <p>
      Mój ulubiony styl projektowania to klasyka wymieszana z nowoczesnością. Takie wnętrza są
      eleganckie, ponadczasowe i nigdy nie wychodzą z mody.<br />
      Bliski jest mi też eklektyzm, czyli twórcze łączenie różnych stylów. To estetyka dla smakoszy,
      którzy cenią intrygujące zestawianie form i przedmiotów w kontrastowy sposób. ­
    </p>
    <p>
      Chętnie podejmuję się rewitalizacji starych, zniszczonych wnętrz, które często stanowią
      znakomite tło dla współczesnego dizajnu.
    </p>
    <p>
      Inspiracjami do mojej pracy projektowej są liczne podróże i lata mieszkania za granicą. Le
      Corbusier uważał, że „obowiązkiem architekta jest podróżowanie”. Zapewne, jednak sama
      obserwacja świata nie wystarczy, ważne jest zdobywane latami doświadczenie zawodowe.
    </p>
    <p>
      Piękno tkwi w pomyśle i jakości jego realizacji.<br />
      Wierzę, że moimi pomysłami zmieniam świat na piękniejszy, przyjaźniejszy i wygodniejszy.
    </p>
    `;
  const REALISATIONS_PLACEHOLDER = [
    {
      title: 'TYTUŁ',
      images: ['/images/person-placeholder.jpg'],
      id: '0'
    }
  ];

  const PUBLICATIONS_PLACEHOLDER = [
    {
      magazineTitle: 'DOM I WNĘTRZE',
      articleTitle: '&bdquo;PO DRUGIEJ STRONIE LUSTRA&rdquo;',
      articleDate: '03/2017'
    }
  ];

  $: pageData = $locale === 'pl' ? data.pl : data.en;
  let title, contactInfo, workshop, publHeading, publData, realData, showUserMenu;

  function initOrReset() {
    $currentUser = data.currentUser;
    title = pageData?.title || 'TUTITUTU';
    contactInfo = JSON.parse(
      JSON.stringify(
        pageData?.contactInfo || {
          name: 'Maria Kowalewska',
          title: 'architekt wnętrz M.A., M.A.',
          email: 'tutitutu@tutitutu.pl',
          phone: '48 602 767 720',
          address1: '02-730 Warszawa',
          address2: 'Aleja Wilanowska 287'
        }
      )
    );
    workshop = pageData?.workshop || WORKSHOP_PLACEHOLDER;
    publHeading =
      pageData?.publHeading ||
      'Na przestrzeni ponad dwóch dekad istnienia pracowni wielokrotnie pisały o nas pisma branżowe:';
    publData = JSON.parse(JSON.stringify(pageData?.publData || PUBLICATIONS_PLACEHOLDER));
    realData = JSON.parse(JSON.stringify(pageData?.realData || REALISATIONS_PLACEHOLDER));
    $isEditing = false;
  }

  // --------------------------------------------------------------------------
  // Page logic
  // --------------------------------------------------------------------------

  function toggleEdit() {
    $isEditing = true;
    showUserMenu = false;
  }

  let itemsToDelete = [];

  function handleDeleteItems(event) {
    itemsToDelete = [...itemsToDelete, ...event.detail.itemsToDelete];
  }

  async function savePage() {
    try {
      if (currentUser) {
        const currentLocale = get(locale).split('-')[0];
        const pageId = currentLocale === 'en' ? 'en' : 'pl';

        await fetchJSON('POST', '/api/save-page', {
          pageId: pageId,
          page: {
            title,
            contactInfo,
            workshop,
            publHeading,
            publData,
            realData
          },
          itemsToDelete
        });
      }
      $isEditing = false;
    } catch (err) {
      console.error(err);
      alert('There was an error. Please try again.');
    }
  }

  $: if (pageData) {
    initOrReset();
  }
</script>

<svelte:head>
  <title>TUTITUTU architektura wnętrz</title>
  <meta name="description" content="TUTITUTU architektura wnętrz" />
  <link rel="alternate" hreflang="en" href="https://tutitutu.pl" />
  <link rel="canonical" href="https://tutitutu.pl" />
</svelte:head>

<main class="bg-surface">
  <section id="start" class="h-screen relative">
    {#if browser}
      {#key $navigating}
        <Scrollactive activeClass="is-active" scrollOffset="0" offset="300" duration="400">
          <WebsiteHeader bind:showUserMenu on:cancel={initOrReset} on:save={savePage}>
            <PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
            <LoginMenu />
          </WebsiteHeader>
        </Scrollactive>
      {/key}
    {/if}
    <NotEditable>
      <Img
        src={$size.width < 640 ? mmMobile : mmdesktop}
        {placeholder}
        alt="Maria Kowalewska"
        class="h-screen object-cover object-bottom"
      />
    </NotEditable>

    <a
      href="/#realisations"
      class="mx-auto px-[6dvi] max-md:hidden absolute w-fit right-0 bottom-5 z-50"
    >
      <svg class="bounce w-8 h-16" viewBox="9 2 14 30" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="white"
          d="M 15 2.841 L 15 27.906 L 10.719 23.624 L 9.281 25.031 L 16 31.748 L 22.719 25.03 L 21.281 23.623 L 17 27.906 L 17 2.841 L 15 2.841 Z"
        />
      </svg>
    </a>
  </section>
  <section id="realisations" class="pb-4 lg:flex">
    <Realisations bind:realisations={realData} on:deleteItems={handleDeleteItems} />
  </section>
  <section id="workshop" class="pb-4 min-h-screen">
    <Workshop bind:workshop />
  </section>
  <section id="publications" class="relative min-h-screen">
    <Publications bind:publHeading bind:publications={publData} />
  </section>
  <section id="references" class="pb-4 min-h-screen">
    <References />
  </section>
  <section id="contact" class="lg:flex bg-accent text-white min-h-screen">
    <Contact bind:contact={contactInfo} />
  </section>
</main>
