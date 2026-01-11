<script>
	import PageBlockCarousel from "$lib/components/page_builder/page_blocks/PageBlockCarousel.svelte";
	import Carousel from "$lib/components/Carousel.svelte";
	import DottedArrow from "$lib/components/DottedArrow.svelte";
	import DottedArrowHover from "$lib/components/DottedArrowHover.svelte";
	import ProjectsGrid, {
		ProjectsGridType,
		ProjectsLoadFunctionality,
		setProjectGridContext
	} from "$lib/components/ProjectsGrid.svelte";
	import PageBlockAccordion from "$lib/components/page_builder/page_blocks/PageBlockAccordion.svelte";
	import { AnimateTrigger, animate, fadeIn } from "$lib/animate";

	setProjectGridContext({
		projects: [{ __typename: "projects", project_title: "Test" }],
		view_more_name: "Components",
		filter: {},
		totalProjectsCount: 29
	});


</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="container">
	<h1>Components</h1>

	<h2>Accordion</h2>
	<PageBlockAccordion data={{
		items: [
			{ heading: "Foo", richText: "Test<br/>This is another line<br/>And one more line" },
			{ heading: "Bar", richText: "Test<br/>This is another line<br/>And one more line" },
			{ heading: "Bat", richText: "Test<br/>This is another line<br/>And one more line" },
			{ heading: "Baz", richText: "Test<br/>This is another line<br/>And one more line" }
		]
	}} />

	<h2>Accordion (oneAtATime)</h2>
	<PageBlockAccordion data={{
		firstItemOpen: true,
		oneAtATime: true,
		items: [
			{ heading: "Foo", richText: "Test<br/>This is another line<br/>And one more line" },
			{ heading: "Bar", richText: "Test<br/>This is another line<br/>And one more line" },
			{ heading: "Bat", richText: "Test<br/>This is another line<br/>And one more line" },
			{ heading: "Baz", richText: "Test<br/>This is another line<br/>And one more line" }
		]
	}} />

	<h2>Carousel</h2>

	<h3>Fade</h3>
	<PageBlockCarousel data={{
		animation: "fade",
		images: [
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffilmdaily.co%2Fwp-content%2Fuploads%2F2020%2F04%2Fcute-cat-videos-lede.jpg&f=1&nofb=1&ipt=cb51a518d71ffc492e14f98fb02d4d9013bf7d4add63f77d40c7dc7cf641e395&ipo=images",
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.pexels.com%2Fphotos%2F45201%2Fkitty-cat-kitten-pet-45201.jpeg&f=1&nofb=1&ipt=cf34b2414cd5a380ffa57a9d8ff0ad4a37deef426cf84b5406f81481f3917b7c&ipo=images",
			"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-_vTDmo_fSTw%2FT3YTV0AfGiI%2FAAAAAAAAAX4%2FZjh2HaoU5Zo%2Fs1600%2Fbeautiful%252Bkitten.jpg&f=1&nofb=1&ipt=b88413bd85bea99fd5e37335bb4d8bbd580367c66f42938e0cfb5908f15eec6d&ipo=images",
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Gh8QtnFEh8LOj1a6-Q88FQHaFj%26pid%3DApi&f=1&ipt=00319a66b4a1e7199408a2347a5bc1a2a93ecda17eaee10f2b25c26b9b3beacb&ipo=images"
		]
	}} />

	<h3>Slide (autoplay)</h3>
	<PageBlockCarousel data={{
		animation: "slide",
		autoplay: true,
		interval: 3000,
		images: [
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffilmdaily.co%2Fwp-content%2Fuploads%2F2020%2F04%2Fcute-cat-videos-lede.jpg&f=1&nofb=1&ipt=cb51a518d71ffc492e14f98fb02d4d9013bf7d4add63f77d40c7dc7cf641e395&ipo=images",
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.pexels.com%2Fphotos%2F45201%2Fkitty-cat-kitten-pet-45201.jpeg&f=1&nofb=1&ipt=cf34b2414cd5a380ffa57a9d8ff0ad4a37deef426cf84b5406f81481f3917b7c&ipo=images",
			"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-_vTDmo_fSTw%2FT3YTV0AfGiI%2FAAAAAAAAAX4%2FZjh2HaoU5Zo%2Fs1600%2Fbeautiful%252Bkitten.jpg&f=1&nofb=1&ipt=b88413bd85bea99fd5e37335bb4d8bbd580367c66f42938e0cfb5908f15eec6d&ipo=images",
			"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Gh8QtnFEh8LOj1a6-Q88FQHaFj%26pid%3DApi&f=1&ipt=00319a66b4a1e7199408a2347a5bc1a2a93ecda17eaee10f2b25c26b9b3beacb&ipo=images"
		]
	}} />
	
	<section  use:animate={{ trigger: AnimateTrigger.OnScrollIntoView, removeOutOfView: true, animClass: "test", targetSelector: "body" }}>

		<h2>ProjectsGrid</h2>

		<ProjectsGrid
			data={{
				num_projects: 9,
				load_functionality: ProjectsLoadFunctionality.LoadMoreButton,
				grid_type: ProjectsGridType.Uniform,
				show_filters: true
			}}
		/>

		<h2>Dotted Arrow</h2>

		<DottedArrowHover href="/">
			Simple Button <DottedArrow />
		</DottedArrowHover>

		<div class="separator" />

		<DottedArrowHover href="/news" numDots={69}>
			L O N G <DottedArrow />
		</DottedArrowHover>

		<div class="separator" />

		<DottedArrowHover href="/contact">
			<div class="large-section">
				Large Hoverable Section <DottedArrow />
			</div>
		</DottedArrowHover>

		<div class="separator" />

		<DottedArrowHover href="/news" numDots={420} delay={0}>
			Sanic <DottedArrow />
		</DottedArrowHover>

		<div class="separator" />

		<DottedArrowHover href="/news" numDots={20} delay={120}>
			Stonks <DottedArrow dot="📈" space="📉" />
		</DottedArrowHover>

		<div class="separator" />
	</section>

	</div>

<style lang="scss">
	.separator {
		display: block;
		height: 128px;
	}

	.large-section {
		height: 400px;
		width: 100vw;
		background-color: #9a9a9a;
	}

	h1 {
		margin-top: var(--GRID-CELL);
	}

	section {
		grid-column: whole;
	}

</style>
