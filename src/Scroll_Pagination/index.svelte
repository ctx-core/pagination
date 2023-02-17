<script>
import { scroll__anchor__onclick } from '@ctx-core/dom'
import { atom_ } from '@ctx-core/nanostores'
import { ripple_effect__onclick } from '@ctx-core/ripple-effect'
import { RippleEffect } from '@ctx-core/ripple-effect-ui-svelte'
/** @type {HTMLElement} */
export let next_section = null
/** @type {HTMLElement} */
export let prev_section = null
/** @type {string|null} */
export let ripple_color = null
/** @type {HTMLElement[]} */
export let section_a = []
const prev_section__loaded_ = atom_(false)
const next_section__loaded_ = atom_(false)
/** @type {HTMLAnchorElement} */
let prev_section_link
/** @type {HTMLAnchorElement} */
let next_section_link
$: section_a, section_navigation__update()
section_navigation__update()
function section_navigation__update() {
	loaded__unset()
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
				loaded__set()
				return
			}
		}
	}
	prev_section = null
	next_section = null
}
function navigation__onclick(event) {
	scroll__anchor__onclick(event)
	if (section_a) {
		if (ripple_color) ripple_effect__onclick(event)
		section_navigation__update()
	}
}
function loaded__unset() {
	prev_section__loaded_.set(false)
	next_section__loaded_.set(false)
}
function loaded__set() {
	if (prev_section_link) {
		prev_section__loaded_.set(true)
	}
	if (next_section_link) {
		next_section__loaded_.set(true)
	}
}
</script>

<svelte:window on:scroll={section_navigation__update}></svelte:window>

<RippleEffect></RippleEffect>

<div class="Scroll_Pagination {$$props.class||''}">
	<div class="outer-container">
		{#if prev_section}
			<a
				bind:this={prev_section_link}
				class="prev_section"
				class:loaded={$prev_section__loaded_}
				href="#{prev_section.id}"
				{ripple_color}
				on:click={navigation__onclick}
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
				class:loaded={$next_section__loaded_}
				href="#{next_section.id}"
				{ripple_color}
				on:click={navigation__onclick}
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

<style>
:global(.Scroll_Pagination) {
	position: fixed;
	bottom: 0;
	right: 0;
	height: 3.6em;
	width: 100%;
	font-size: 1rem;
	overflow: hidden;
}
	:global(.Scroll_Pagination.lower-left) {
		bottom: 0;
		left: 0;
		right: auto;
	}
	:global(.Scroll_Pagination.outer-container) {
		display: flex;
		flex-direction: row;
		height: 100%;
		margin: auto;
	}
		:global(.Scroll_Pagination.outer-container > a) {
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
		}
			:global(.Scroll_Pagination.outer-container > a.prev_section) {
				text-align: left;
				padding-right: 12px;
			}
				:global(.Scroll_Pagination.outer-container > a.prev_section .section__icon) {
					float: left;
					margin: 9px 8px 0 3px;
				}
				:global(.Scroll_Pagination.outer-container > a.prev_section .ripple-effect) {
					left: 0;
				}
			:global(.Scroll_Pagination.outer-container > a.next_section) {
				flex-direction: row-reverse;
				text-align: right;
				padding-left: 12px;
			}
				:global(.Scroll_Pagination.outer-container > a.next_section .section__icon) {
					float: right;
					margin: 9px 3px 0 8px;
				}
				:global(.Scroll_Pagination.outer-container > a.next_section .ripple-effect) {
					right: 0;
				}
			:global(.Scroll_Pagination.outer-container > a.loaded div) {
				opacity: 1;
				transition: opacity .25s ease-out;
			}
			:global(.Scroll_Pagination.outer-container > a .ripple-effect) {
				position: absolute;
				bottom: 0;
				height: 2px;
			}
			:global(.Scroll_Pagination.outer-container > a .section__icon) {
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
			:global(.Scroll_Pagination.outer-container > a .content) {
				flex: 1;
			}
				:global(.Scroll_Pagination.outer-container > a .content .label) {
					font-size: .75em;
					line-height: 1em;
					margin-bottom: 1px;
					vertical-align: top;
				}
				:global(.Scroll_Pagination.outer-container > a .content .title) {
					line-height: 1.25em;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			:global(.Scroll_Pagination.outer-container > a div) {
				opacity: 0;
			}
</style>
