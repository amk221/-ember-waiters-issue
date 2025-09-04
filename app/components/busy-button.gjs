import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { load } from 'ember-async-data';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class BusyButtonComponent extends Component {
  @tracked data;

  @action
  runAsyncFunction() {
    this.data = load(this.args.onClick());
  }

  <template>
    <button
      type="button"
      class="button"
      aria-busy="{{this.data.isPending}}"
      data-state={{this.data.state}}
      {{on "click" this.runAsyncFunction}}
      ...attributes
    >
      {{#if this.data.isPending}}
        {{if @busyText @busyText @text}}
      {{else}}
        {{@text}}
      {{/if}}
    </button>
  </template>
}
