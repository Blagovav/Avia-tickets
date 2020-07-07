import '../css/style.css';
import './plugins';
import locations from './store/location';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';


document.addEventListener('DOMContentLoaded', ()=> {
  initApp();
  const form = formUI.form;
  //EVENTS  
  form.addEventListener('submit',(e) => {
    e.preventDefault();
    onFormSubmit();
  })

  //HANDLERS

  async function initApp () {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }
  async function onFormSubmit() {
    //сбор данных
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    console.log(origin,destination,depart_date,return_date);
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    });
    console.log(locations.lastSearch);
    ticketsUI.renderTickets(locations.lastSearch);
  }
});