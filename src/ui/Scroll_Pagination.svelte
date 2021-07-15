<script>
import { writable$ } from '@ctx-core/store'
import { RippleEffect, onclick_ripple_effect } from '@ctx-core/ripple-effect'
import { onclick_scroll_anchor } from '@ctx-core/dom'
export let prev_section = null
export let next_section = null
export let section_a = []
export let ripple_color = null
const prev_section_loaded$ = writable$(null)
const next_section_loaded$ = writable$(null)
let prev_section_link: HTMLAnchorElement, next_section_link: HTMLAnchorElement
$: section_a, update_section_navigation()
update_section_navigation()
function update_section_navigation() {
	unset_loaded()
	if (section_a) {
		for (let i = 0; i < section_a.length; i += 1) {
			const section = section_a[i]
			const BoundingClientRect = section.getBoundingClientRect()
			const { top } = BoundingClientRect
			const bottom = BoundingClientRect.bottom - 10
			if (bottom >= 0) {
				prev_section =
					top < 0
					? section
					: section_a[i - 1]
				next_section = section_a[i + 1]
				set_loaded()
				return
			}
		}
	}
	prev_section = null
	next_section = null
}
function onclick_navigation(event) {
	onclick_scroll_anchor(event)
	if (section_a) {
		if (ripple_color) onclick_ripple_effect(event)
		update_section_navigation()
	}
}
function unset_loaded() {
	prev_section_loaded$.set(false)
	next_section_loaded$.set(false)
}
function set_loaded() {
	if (prev_section_link) {
		prev_section_loaded$.set(true)
	}
	if (next_section_link) {
		next_section_loaded$.set(true)
	}
}
</script>

<svelte:window on:scroll="{update_section_navigation}"></svelte:window>

<RippleEffect></RippleEffect>

<div class="Scroll_Pagination {$$props.class||''}">
	<div class="outer-container">
		{#if prev_section}
			<a
				bind:this={prev_section_link}
				class="prev_section"
				class:loaded={$prev_section_loaded$}
				href="#{prev_section.id}"
				{ripple_color}
				on:click={onclick_navigation}
			>
				<div class="prev_section__icon section__icon">
					<slot name="icon-up"></slot>
				</div>
				<div class="content">
					<div class="label">Previous</div>
					<div class="title">{prev_section.title}</div>
				</div>
			</a>
		{/if}
		{#if next_section}
			<a
				bind:this={next_section_link}
				class="next_section"
				class:loaded={$next_section_loaded$}
				href="#{next_section.id}"
				{ripple_color}
				on:click={onclick_navigation}
			>
				<div class="next_section__icon section__icon">
					<slot name="icon-down"></slot>
				</div>
				<div class="content">
					<div class="label">Next</div>
					<div class="title">{next_section.title}</div>
				</div>
			</a>
		{/if}
	</div>
</div>

<style type="text/scss">
:global(.Scroll_Pagination) {
	position: fixed;
	bottom: 0;
	right: 0;
	height: 3.6em;
	width: 100%;
	font-size: 1rem;
	overflow: hidden;
	&.lower-left {
		bottom: 0;
		left: 0;
		right: auto;
	}
	.outer-container {
		display: flex;
		flex-direction: row;
		height: 100%;
		margin: auto;
		> a {
			position: relative;
			display: flex;
			flex-direction: row;
			flex: 1;
			width: 50%;
			height: 100%;
			box-sizing: border-box;
			padding-top: 14px;
			overflow: hidden;
			text-overflow: ellipsis;
			text-decoration: none;
			white-space: nowrap;
			user-select: none;
			&.prev_section {
				text-align: left;
				padding-right: 12px;
				.section__icon {
					float: left;
					margin: 9px 8px 0 3px;
				}
				.ripple-effect {
					left: 0;
				}
			}
			&.next_section {
				flex-direction: row-reverse;
				text-align: right;
				padding-left: 12px;
				.section__icon {
					float: right;
					margin: 9px 3px 0 8px;
				}
				.ripple-effect {
					right: 0;
				}
			}
			&.loaded {
				div {
					opacity: 1;
					transition: opacity .25s ease-out;
				}
			}
			.ripple-effect {
				position: absolute;
				bottom: 0;
				height: 2px;
			}
			.section__icon {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: flex-start;
				flex: 0;
				min-width: 20px;
				max-width: 20px;
				padding-bottom: 1rem;
				background-size: contain;
			}
			.content {
				flex: 1;
				.label {
					font-size: .75em;
					line-height: 1em;
					margin-bottom: 1px;
					vertical-align: top;
				}
				.title {
					line-height: 1.25em;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			div {
				opacity: 0;
			}
		}
	}
}
</style>
