import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { defer } from 'rsvp';
import { waitFor } from '@ember/test-waiters';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class ApplicationController extends Controller {
  @tracked showModal;

  perform = async () => {
    console.log('clicked perform');
    this.deferred = defer();
    this.showModal = true;
    const prompt = await this.deferred.promise;
    this.showModal = false;
    if (prompt.confirmed) {
      await sleep(1000);
      console.log('yey, performing');
    } else {
      console.log('nay');
    }
  };

  confirm = () => {
    console.log('clicked confirm');
    this.deferred.resolve({ confirmed: true });
  };

  cancel = () => {
    console.log('clicked cancel');
    this.deferred.resolve({ confirmed: false });
  };
}
