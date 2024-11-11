window.onload = () => {

  initAutocomplete();

  

  let isApiRequestInProgress = false;
  let uploadedFile = null;
  let uploadedCSV = null;
  let currentStep = 0;
  let selectedPropertyType = null;
  let sliderValue = 0;
  let selectedSolarOption = null;
  let selectedRoofOption = null;
  let selectedBatteryOption = null;
  let emailTouched = false;
  let gatheredFormData = {};


  
  const defaultApiKey = 'uXwpFHLYA2jqv2bv624Wttmd0BU2-NqZpbQpdDX_sQk';

  
  const dropArea = document.getElementById('dropArea');
  const fileInput = document.getElementById('fileInput');
  const dropText = document.getElementById('dropText');
  const fileNameDisplay = document.getElementById('fileName');
  const uploadLink = document.getElementById('uploadLink');
  const removeUploadLink = document.getElementById('removeUpload');
  const noBillSection = document.getElementById('noBillSection');
  const backToUploadBtn = document.getElementById('backToUploadBtn');
  const dollarAmount = document.getElementById('dollarAmount');
  const amountDisplay = document.getElementById('amountDisplay');
  const dollarAmount2 = document.getElementById('dollarAmount2');
  const amountDisplay2 = document.getElementById('amountDisplay2');
  const dollarAmount3 = document.getElementById('dollarAmount3');
  const amountDisplay3 = document.getElementById('amountDisplay3');
  const noBillButton = document.getElementById('noBillButton');
  const infotext = document.getElementById('infotext');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const iconLarge1 = document.getElementById('icon-large-1');
  const iconLarge2 = document.getElementById('icon-large-2');
  const smartmeter = document.getElementById('smartmeter');
  const csvInput = document.getElementById('csvInput');
  const uploadLinkCSV = document.getElementById('uploadLinkCSV');
  const csvFileNameDisplay = document.getElementById('csvFileName');
  const removeCSVUploadLink = document.getElementById('removeCSVUpload');
  const residentialOption = document.getElementById('residentialOption');
  const businessOption = document.getElementById('businessOption');
  const sectorList = document.getElementById('sectorList');
  const noGasCheckbox = document.getElementById('noGasCheckbox');
  const hotWaterSection = document.getElementById('hotWaterSection');
  const heatingSection = document.getElementById('heatingSection');
  const cookingSection = document.getElementById('cookingSection');
  const poolSection = document.getElementById('poolSection');
  const retailerCards = document.querySelectorAll('.retailer-card');
  

  noBillSection.style.display = 'block'; 
  dropArea.style.display = 'none'; 
  backToUploadBtn.style.display = 'block'; 
  noBillButton.style.display = 'none';

  const nosolarOption = document.getElementById('nosolarOption');
  const yessolarOption = document.getElementById('yessolarOption');
  const yesroofOption = document.getElementById('yesroofOption');
  const noroofOption = document.getElementById('noroofOption');
  const nobatteryOption = document.getElementById('nobatteryOption');
  const yesbatteryOption = document.getElementById('yesbatteryOption');

  const hotWaterOptions = document.querySelectorAll('#gasStorageOption, #gasInstOption, #hotWaterNotSure, #hotWaterNoGas');
  const heatingOptions = document.querySelectorAll('#gasDuctedOption, #gasHeaterOption, #gasHydroOption, #heatingNotSure, #heatingNoGas');
  const cookingOptions = document.querySelectorAll('#gasCooktopOption, #gasFreestandingOption, #gasOvenOption, #cookingNotSure, #cookingNoGas');
  const poolOptions = document.querySelectorAll('#gasPoolOption, #poolNoGas');

  const nameInput = document.getElementById('name');
  const addressInput = document.getElementById('address');
  const emailInput = document.getElementById('email');
  const errorsElem = document.getElementById('error-messages');

  errorsElem.style.display = 'none';
  dollarAmount.value = 0;
  dollarAmount2.value = 0;
  dollarAmount3.value = 0;
  noGasCheckbox.checked = false;
  document.getElementById('Sector').value = null;

  showStep(0);


  function showStep(step) {
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    const lines = document.querySelectorAll('.line');

    steps.forEach((stepElement, index) => {
      stepElement.classList.toggle('active', index === step);
    });

    stepIndicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index <= step);
    });

    lines.forEach((line, index) => {
      line.classList.toggle('active', index < step);
    });

    prevBtn.style.display = step === 0 ? 'none' : 'inline';
    nextBtn.innerHTML = step === steps.length - 1 ? 'Submit' : 'Next';

    

    updateButtonVisibility();
  }

  function scrollToCurrentStep() {
    const activeStep = document.querySelector('.form-step.active');
    if (activeStep) {
      activeStep.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  function changeStep(n) {
    currentStep += n;
    showStep(currentStep);
  }

  function handleFiles(files) {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        dropText.textContent = 'Electricity Bill uploaded!';
        fileNameDisplay.textContent = `Uploaded file: ${file.name}`;
        infotext.style.display = 'none';
        uploadLink.style.display = 'none';
        removeUploadLink.style.display = 'inline';
        uploadedFile = file;
        noBillSection.style.display = 'none';
        noBillButton.style.display = 'none';
        iconLarge1.style.display = 'none';
        iconLarge2.style.display = '';
        document.getElementById('nameField').style.display = 'none';
        document.getElementById('addressField').style.display = 'none';
        updateButtonVisibility();
      } else if (file.type === 'text/csv') {
        csvFileNameDisplay.textContent = `Uploaded CSV file: ${file.name}`;
        uploadLinkCSV.style.display = 'none';
        removeCSVUploadLink.style.display = 'inline';
        uploadedCSV = file;
        updateButtonVisibility();
      } else {
        alert('Please drop a PDF file or CSV file.');
      }
    }
  }

  function removeUpload() {
    uploadedFile = null;
    fileInput.value = '';
    dropText.textContent = 'Drag and drop your electricity bill here';
    fileNameDisplay.textContent = '';
    uploadLink.style.display = 'inline';
    infotext.style.display = 'block';
    removeUploadLink.style.display = 'none';
    noBillSection.style.display = 'none';
    noBillButton.style.display = 'block';
    iconLarge1.style.display = '';
    iconLarge2.style.display = 'none';
    smartmeter.style.display = 'none';

    if (parseFloat(dollarAmount.value) > 0) {
      document.getElementById('nameField').style.display = 'block';
      document.getElementById('addressField').style.display = 'block';
    }

    updateButtonVisibility();
  }

  function removeCSVUpload() {
    uploadedCSV = null;
    csvInput.value = '';
    csvFileNameDisplay.textContent = '';
    uploadLinkCSV.style.display = 'inline';
    removeCSVUploadLink.style.display = 'none';
    updateButtonVisibility();
  }

  function updateButtonVisibility() {
    const isPropertyTypeSelected = selectedPropertyType !== null;
    const isPDFUploaded = uploadedFile !== null;
    const isSliderValueValid = sliderValue > 0;
    const isSolarOptionSelected = selectedSolarOption !== null;
    const isRoofOptionSelected = selectedRoofOption !== null;
    const isBatteryOptionSelected = selectedBatteryOption !== null;
    const isNameFieldDisplayed = document.getElementById('nameField').style.display !== 'none';
    const isAddressFieldDisplayed = document.getElementById('addressField').style.display !== 'none';
    const isNameValid = isNameFieldDisplayed ? nameInput.value.trim() !== '' : true;
    const isAddressValid = isAddressFieldDisplayed ? addressInput.value.trim() !== '' : true;
    const isEmailValid = validateEmail(emailInput.value.trim());

    if (emailTouched) {
        emailInput.style.borderColor = isEmailValid ? '' : 'red';
    }

    if (currentStep === 0) {
        if ((isPropertyTypeSelected && isPDFUploaded) || (isPropertyTypeSelected && isSliderValueValid)) {
            nextBtn.disabled = false;
            nextBtn.style.backgroundColor = '';
        } else {
            nextBtn.disabled = true;
            nextBtn.style.backgroundColor = 'rgb(230, 242, 216)';
        }
    } else if (currentStep === 1) {
        if (isSolarOptionSelected && isRoofOptionSelected && isBatteryOptionSelected) {
            nextBtn.disabled = false;
            nextBtn.style.backgroundColor = '';
        } else {
            nextBtn.disabled = true;
            nextBtn.style.backgroundColor = 'rgb(230, 242, 216)';
        }
    } else if (currentStep === 2) {
        const isHotWaterSelected = Array.from(hotWaterOptions).some(option => option.classList.contains('selected'));
        const isHeatingSelected = Array.from(heatingOptions).some(option => option.classList.contains('selected'));
        const isCookingSelected = Array.from(cookingOptions).some(option => option.classList.contains('selected'));
        const isPoolSelected = Array.from(poolOptions).some(option => option.classList.contains('selected'));

        if (!noGasCheckbox.checked && !(isHotWaterSelected && isHeatingSelected && isCookingSelected && isPoolSelected && sliderValue > 0)) {
            nextBtn.disabled = true;
            nextBtn.style.backgroundColor = 'rgb(230, 242, 216)';
        } else {
            nextBtn.disabled = false;
            nextBtn.style.backgroundColor = '';
        }
    } else if (currentStep === 3) {
        if (isNameValid && isAddressValid && isEmailValid) {
            nextBtn.disabled = false;
            nextBtn.style.backgroundColor = '';
        } else {
            nextBtn.disabled = true;
            nextBtn.style.backgroundColor = 'rgb(230, 242, 216)';
        }
    }
}


  function validateEmail(email) {
    const re = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return re.test(email);
  }

  function formatNumber(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function selectOption(optionId) {
    if (optionId === 'residentialOption') {
      selectedPropertyType = 'residential';
      residentialOption.classList.add('selected');
      businessOption.classList.remove('selected');
      sectorList.style.display = 'none';
      dollarAmount.max = 10000;
      dollarAmount3.max = 10000;
      document.getElementById('noBillSection').scrollIntoView({
        behavior: 'smooth'
    });
    } else if (optionId === 'businessOption') {
      selectedPropertyType = 'business';
      businessOption.classList.add('selected');
      residentialOption.classList.remove('selected');
      sectorList.style.display = 'block';
      dollarAmount.max = 500000;
      dollarAmount3.max = 500000;

      document.getElementById('noBillSection').scrollIntoView({
        behavior: 'smooth'
    });
    } else if (optionId === 'nosolarOption') {
      selectedSolarOption = 'nosolar';
      nosolarOption.classList.add('selected');
      yessolarOption.classList.remove('selected');
      document.getElementById('more').style.display = 'none';
      setTimeout(() => {
      document.getElementById('roofOptions').scrollIntoView({
        behavior: 'smooth' 
      });
    }, 100);
    } else if (optionId === 'yessolarOption') {
      selectedSolarOption = 'yessolar';
      yessolarOption.classList.add('selected');
      nosolarOption.classList.remove('selected');
      document.getElementById('more').style.display = 'inline';
      setTimeout(() => {
        document.getElementById('roofOptions').scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    } else if (optionId === 'yesroofOption') {
      selectedRoofOption = 'yesroof';
      yesroofOption.classList.add('selected');
      noroofOption.classList.remove('selected');
      setTimeout(() => {
      document.getElementById('batteryOptions').scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
    } else if (optionId === 'noroofOption') {
      selectedRoofOption = 'noroof';
      noroofOption.classList.add('selected');
      yesroofOption.classList.remove('selected');
      setTimeout(() => {
        document.getElementById('batteryOptions').scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    } else if (optionId === 'nobatteryOption') {
      selectedBatteryOption = 'nobattery';
      nobatteryOption.classList.add('selected');
      yesbatteryOption.classList.remove('selected');
    } else if (optionId === 'yesbatteryOption') {
      selectedBatteryOption = 'yesbattery';
      yesbatteryOption.classList.add('selected');
      nobatteryOption.classList.remove('selected');
    }

    if (selectedSolarOption !== null) {
      document.getElementById('roofOptions').style.display = 'block';
    }

    if (selectedRoofOption !== null) {
      document.getElementById('batteryOptions').style.display = 'block';
    }

    updateButtonVisibility();
  }

  residentialOption.addEventListener('click', () => {
    selectOption('residentialOption');
  });

  businessOption.addEventListener('click', () => {
    selectOption('businessOption');
    document.getElementById('Sector').value = 'retail';
  });

  nosolarOption.addEventListener('click', () => {
    selectOption('nosolarOption');
    document.getElementById('feedin').style.display = 'none';
  });

  yessolarOption.addEventListener('click', () => {
    selectOption('yessolarOption');
    document.getElementById('feedin').style.display = 'block';
  });

  yesroofOption.addEventListener('click', () => {
    selectOption('yesroofOption');
  });

  noroofOption.addEventListener('click', () => {
    selectOption('noroofOption');
  });

  nobatteryOption.addEventListener('click', () => {
    selectOption('nobatteryOption');
  });

  yesbatteryOption.addEventListener('click', () => {
    selectOption('yesbatteryOption');
  });

  uploadLink.addEventListener('click', (event) => {
    event.preventDefault();
    fileInput.click();
  });

  csvInput.addEventListener('change', (event) => {
    handleFiles(csvInput.files);
  });

  fileInput.addEventListener('change', (event) => {
    handleFiles(fileInput.files);
  });

  removeUploadLink.addEventListener('click', removeUpload);
  removeCSVUploadLink.addEventListener('click', removeCSVUpload);

  noBillButton.addEventListener('click', () => {
    noBillSection.style.display = 'block';  
    noBillButton.style.display = 'none';  
    dropArea.style.display = 'none';  
    backToUploadBtn.style.display = 'block';  
  });

  backToUploadBtn.addEventListener('click', () => {
    noBillSection.style.display = 'none'; 
    dropArea.style.display = 'flex'; 
    dropArea.style.flexDirection = 'column';  
    dropArea.style.alignItems = 'center';
    noBillButton.style.display = 'block';  
    backToUploadBtn.style.display = 'none';  
  });

  dollarAmount.addEventListener('input', () => {
    sliderValue = parseFloat(dollarAmount.value) || 0;
    amountDisplay.textContent = formatNumber(sliderValue);

    if (sliderValue > 0 && !uploadedFile) {
      document.getElementById('nameField').style.display = 'block';
      document.getElementById('addressField').style.display = 'block';
    } else if (sliderValue <= 0) {
      document.getElementById('nameField').style.display = 'none';
      document.getElementById('addressField').style.display = 'none';
    }

    updateButtonVisibility();
  });

  dollarAmount2.addEventListener('input', () => {
    sliderValue = parseFloat(dollarAmount2.value) || 0;
    amountDisplay2.textContent = formatNumber(sliderValue);
    updateButtonVisibility();
  });

  dollarAmount3.addEventListener('input', () => {
    sliderValue = parseFloat(dollarAmount3.value) || 0;
    amountDisplay3.textContent = formatNumber(sliderValue);
    updateButtonVisibility();
    handleGasStepVisibility();
  });

  nextBtn.addEventListener('click', () => {
    if (currentStep === 0) {
      if (!selectedPropertyType) {
        alert('Please select a property type (Residential or Business).');
        return;
      }
      if (noBillSection.style.display === 'block' && sliderValue <= 0) {
        alert('Please input a value greater than 0 for the slider.');
        return;
      }
    } else if (currentStep === 1) {
      if (!selectedSolarOption) {
        alert('Please select an option for Solar.');
        return;
      }
      if (selectedSolarOption && !selectedRoofOption) {
        alert('Please select an option for Roof Space for Solar.');
        return;
      }
      if (selectedRoofOption && !selectedBatteryOption) {
        alert('Please select an option for Battery.');
        return;
      }
    } else if (currentStep === 2) {
      const isHotWaterSelected = Array.from(hotWaterOptions).some(option => option.classList.contains('selected'));
      const isHeatingSelected = Array.from(heatingOptions).some(option => option.classList.contains('selected'));
      const isCookingSelected = Array.from(cookingOptions).some(option => option.classList.contains('selected'));
      const isPoolSelected = Array.from(poolOptions).some(option => option.classList.contains('selected'));

      if (!noGasCheckbox.checked && !(isHotWaterSelected && isHeatingSelected && isCookingSelected && isPoolSelected && sliderValue > 0)) {
        alert('Please make sure all options are selected or check "I don\'t have gas".');
        return;
      }
    } else if (currentStep === 3) {
      if (nextBtn.disabled) {
        alert('Please fill out all required fields.');
        return;
      }

      gatheredFormData = gatherFormData();
      const email = emailInput.value.trim();
      sendDataToAPI(gatheredFormData, email);
      return;
    }
    changeStep(1);
  });

  prevBtn.addEventListener('click', () => changeStep(-1));

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  dropArea.addEventListener('drop', handleDrop, false);

  function handleDrop(event) {
    const dt = event.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  }

  function handleGasStepVisibility() {
    if (noGasCheckbox.checked) {
      dollarAmount3.style.display = 'none';
      amountDisplay3.parentElement.style.display = 'none';
      hotWaterSection.style.display = 'none';
      heatingSection.style.display = 'none';
      cookingSection.style.display = 'none';
      poolSection.style.display = 'none';
    } else {
      dollarAmount3.style.display = '';
      amountDisplay3.parentElement.style.display = '';
      if (sliderValue > 0) {
        hotWaterSection.style.display = '';
        heatingSection.style.display = 'none';
        cookingSection.style.display = 'none';
        poolSection.style.display = 'none';
      } else {
        hotWaterSection.style.display = 'none';
        heatingSection.style.display = 'none';
        cookingSection.style.display = 'none';
        poolSection.style.display = 'none';
      }
    }
    updateButtonVisibility();
  }

  noGasCheckbox.addEventListener('change', () => {
    handleGasStepVisibility();
    if (!noGasCheckbox.checked) {
      dollarAmount3.value = 0;
      amountDisplay3.textContent = 0;
      sliderValue = 0;
    }
  });
  dollarAmount3.addEventListener('input', handleGasStepVisibility);

  document.querySelectorAll('.quantity-btn').forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const input = this.parentElement.querySelector('.quantity');
      const currentValue = parseInt(input.value);

      if (this.classList.contains('decrement')) {
        if (currentValue > 1) {
          input.value = currentValue - 1;
        }
      } else if (this.classList.contains('increment')) {
        input.value = currentValue + 1;
      }

      input.setAttribute('value', input.value);
    });
  });

  function handleOptionClick(clickedOption, allOptions, specialOptions) {
    const optionType = clickedOption.getAttribute('data-option');
    const isSpecialOption = specialOptions.includes(optionType);

    if (isSpecialOption) {
      allOptions.forEach(option => {
        option.classList.remove('selected');
        hideQtyForOption(option.getAttribute('data-option'));
      });
      clickedOption.classList.add('selected');
    } else {
      allOptions.forEach(option => {
        if (specialOptions.includes(option.getAttribute('data-option'))) {
          option.classList.remove('selected');
        }
      });
      clickedOption.classList.toggle('selected');
    }

    if (clickedOption.classList.contains('selected')) {
      showQtyForOption(optionType);
    } else {
      hideQtyForOption(optionType);
    }

    updateGasSectionVisibility();
    updateButtonVisibility();
  }

  function updateGasSectionVisibility() {
    const isHotWaterSelected = Array.from(hotWaterOptions).some(option => option.classList.contains('selected'));
    const isHeatingSelected = Array.from(heatingOptions).some(option => option.classList.contains('selected'));
    const isCookingSelected = Array.from(cookingOptions).some(option => option.classList.contains('selected'));

    if (isHotWaterSelected) {
      heatingSection.style.display = '';
      setTimeout(() => {
        document.getElementById('heatingSection').scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    } else {
      heatingSection.style.display = 'none';
    }

    if (isHeatingSelected) {
      cookingSection.style.display = '';
      setTimeout(() => {
        document.getElementById('cookingSection').scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    } else {
      cookingSection.style.display = 'none';
    }

    if (isCookingSelected) {
      poolSection.style.display = '';
      setTimeout(() => {
        document.getElementById('poolSection').scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    } else {
      poolSection.style.display = 'none';
    }
  }

  [hotWaterOptions, heatingOptions, cookingOptions, poolOptions].forEach((optionsGroup) => {
    const specialOptions = ['notSure', 'noGas', 'heatingnotSure', 'heatingnoGas', 'cookingnotSure', 'cookingnoGas', 'poolnoGas'];
    optionsGroup.forEach(option => {
      option.addEventListener('click', () => {
        handleOptionClick(option, optionsGroup, specialOptions);
      });
    });
  });

  function showQtyForOption(optionType) {
    switch (optionType) {
      case 'gasStorage': document.getElementById('storageQty').style.display = 'none'; break;
      case 'gasInst': document.getElementById('instQty').style.display = 'none'; break;
      case 'gasDucted': document.getElementById('ductedQty').style.display = 'none'; break;
      case 'gasHeater': document.getElementById('HeaterQty').style.display = 'none'; break;
      case 'gasHydro': document.getElementById('HydroQty').style.display = 'none'; break;
      case 'gasCooktop': document.getElementById('cooktopQty').style.display = 'none'; break;
      case 'gasFreestanding': document.getElementById('freestandingQty').style.display = 'none'; break;
      case 'gasOven': document.getElementById('gasOvenQty').style.display = 'none'; break;
      case 'gasPool': document.getElementById('poolQty').style.display = 'none'; break;
      case 'gasThermal': document.getElementById('thermalQty').style.display = 'none'; break;
      default: break;
    }
  }

  function hideQtyForOption(optionType) {
    switch (optionType) {
      case 'gasStorage': document.getElementById('storageQty').style.display = 'none'; break;
      case 'gasInst': document.getElementById('instQty').style.display = 'none'; break;
      case 'gasDucted': document.getElementById('ductedQty').style.display = 'none'; break;
      case 'gasHeater': document.getElementById('HeaterQty').style.display = 'none'; break;
      case 'gasHydro': document.getElementById('HydroQty').style.display = 'none'; break;
      case 'gasCooktop': document.getElementById('cooktopQty').style.display = 'none'; break;
      case 'gasFreestanding': document.getElementById('freestandingQty').style.display = 'none'; break;
      case 'gasOven': document.getElementById('gasOvenQty').style.display = 'none'; break;
      case 'gasPool': document.getElementById('poolQty').style.display = 'none'; break;
      case 'gasThermal': document.getElementById('thermalQty').style.display = 'none'; break;
      default: break;
    }
  }

  [nameInput, addressInput, emailInput].forEach(input => {
    input.addEventListener('input', updateButtonVisibility);
  });

  emailInput.addEventListener('blur', () => {
    emailTouched = true;
    updateButtonVisibility();
  });

  function showSubmissionPage(email) {
    document.body.innerHTML = `
      <div class="centered-div">
        <h1>Electrify Everything</h1>
        <div class="submitted-message">
          <span class="Subblue">Submitted!</span>
          <h2 style="margin:100px 0 100px 0;">Your proposal is currently being created.</h2>
          <h2>What happens next?</h2>
          <div class="submsg">
            <span class="whatsnext">Within 5 minutes you will receive your personalised proposal sent to: ${email}</span>   
            <span class="whatsnext">Please check your junk and spam folders if you have not received the email.</span>
          </div>
        </div>
      </div>
    `;


}

  function sendDataToAPI(data, email) {
    if (isApiRequestInProgress) {
      return;
    }
  
    isApiRequestInProgress = true;
  
    nextBtn.setAttribute("disabled", "disabled");
    prevBtn.setAttribute("disabled", "disabled");
    errorsElem.style.display = 'none';
  
    const formData = new FormData();
    if (uploadedFile != null) {
      formData.append('electricityBillPdf', uploadedFile);
    }
    if (uploadedCSV != null) {
      formData.append('intervalData', uploadedCSV);
    }
  
    formData.append('inputs', JSON.stringify(data));
  
   

fetch(embed_api_url, {
  method: 'POST',
  headers: {
    'api-key': defaultApiKey,
  },
  body: formData
})
.then(resp => {
  if (resp.ok) {
    return resp.json();
  }
  return Promise.reject(resp);
})
.then(success => {
  showSubmissionPage(email);
})
.catch((error) => {
  console.error(`Error for API key ${defaultApiKey}:`, error);
  isApiRequestInProgress = false;

  nextBtn.removeAttribute("disabled");
  prevBtn.removeAttribute("disabled");

  error.json().then(errors => {
    errorsElem.style.display = '';
    let textContent = 'Errors:\n\n';
    errors.forEach(err => textContent += `- ${err.message}\n`);
    errorsElem.textContent = textContent;
  }).catch(() => { });
});

  }

  function gatherFormData() {
    const hasSolar = selectedSolarOption === 'yessolar';
    const isPdfUpload = uploadedFile != null;

    const formData = {
      customerType: selectedPropertyType,
      sector: selectedPropertyType === 'business' ? document.getElementById('Sector').value : null,
      customerEmail: emailInput.value.trim(),
      customerName: isPdfUpload ? null : nameInput.value,
      address: isPdfUpload ? null : addressInput.value,
      electricityAnnualBill: parseFloat(dollarAmount.value) || null,
      solar: {
        hasRoofSpace: selectedRoofOption === 'yesroof',
        hasExistingSolar: hasSolar,
        existingSolarDetails: {
          exportRate: hasSolar ? parseFloat(dollarAmount2.value) || null : null
        }
      },
      hasBattery: selectedBatteryOption === 'yesbattery',
      gasAnnualBill: parseFloat(dollarAmount3.value) || null,
      electrification: {
        gas: gatherGasData()
      },
    };

    return formData;
  }

  function gatherGasData() {
    const gasData = [];

    function addGasItem(optionId, label, propertyItem) {
      const optionElement = document.getElementById(optionId);
      if (optionElement && optionElement.classList.contains('selected')) {
        const quantity = optionId.toLowerCase().endsWith('notsure') ?
          1 :
          parseInt(optionElement.nextElementSibling.querySelector('.quantity').value);
        gasData.push({
          label,
          item: propertyItem,
          quantity
        });
      }
    }

    addGasItem('cookingNotSure', 'Gas Cooktop', { type: 'cooking', name: 'Gas Cooktop Only' }, 'cooking');
    addGasItem('gasCooktopOption', 'Gas Cooktop', { type: 'cooking', name: 'Gas Cooktop Only' }, 'cooking');
    addGasItem('gasFreestandingOption', 'Gas Cooktop & Oven Freestanding', { type: 'cooking', name: 'Gas Cooktop & Oven - Freestanding' }, 'cooking');
    addGasItem('gasOvenOption', 'Gas Oven', { type: 'cooking', name: 'Gas Oven Only' }, 'cooking');

    addGasItem('heatingNotSure', 'Gas Heating - Ducted', { type: 'space_heating', name: 'Gas Heating - Ducted' }, 'space_heating');
    addGasItem('gasDuctedOption', 'Gas Heating - Ducted', { type: 'space_heating', name: 'Gas Heating - Ducted' }, 'space_heating');
    addGasItem('gasHeaterOption', 'Gas Room / Space Heater', { type: 'space_heating', name: 'Gas Room/Space Heater' }, 'space_heating');
    addGasItem('gasHydroOption', 'Gas Hydronic Wall / Floor Radiator Heating', { type: 'space_heating', name: 'Gas Hydronic Wall / Floor Radiator Heating' }, 'space_heating');

    addGasItem('hotWaterNotSure', 'Gas Storage', { type: 'water_heating', name: 'Gas Storage Hot Water' }, 'water_heating');
    addGasItem('gasStorageOption', 'Gas Storage', { type: 'water_heating', name: 'Gas Storage Hot Water' }, 'water_heating');
    addGasItem('gasInstOption', 'Gas Instantaneous', { type: 'water_heating', name: 'Gas Instantaneous Hot Water' }, 'water_heating');

    addGasItem('gasPoolOption', 'Gas Pool Heating', { type: 'pool_heating', name: 'Gas Pool Heating' }, 'pool_heating');

    return gasData;
  }
};

document.querySelector('#nextBtn').addEventListener('click', function() {
  document.querySelector('.centered-div').scrollIntoView({
    behavior: 'smooth'
  });
});


function initAutocomplete() {
  const input = document.getElementById('address');
  
  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['geocode'],
    componentRestrictions: { country: 'au' }
  });

  autocomplete.addListener('place_changed', function() {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      alert("No details available for input: '" + place.name + "'");
      return;
    }

  });
}