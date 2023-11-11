import { SvelteComponent } from 'svelte'
export class Scroll_Pagination extends SvelteComponent<{
	class?:string
	next_section?:HTMLElement
	prev_section?:HTMLElement
	ripple_color?:string
	section_a?:HTMLElement[]
}> {}
