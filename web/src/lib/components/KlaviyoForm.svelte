<script lang="ts">
	import { goto } from '$app/navigation';

	// List ID: Uw9EZN
  // Public API: V8f9rv

  // UI Triggers
  let submitting: any, error: any = false;
  let firstError: boolean, lastError: boolean, emailError: boolean, phoneError: boolean, companyError: boolean, locationError: boolean, messageError: boolean, designError: boolean = false;
  let firstValid: boolean, lastValid: boolean, emailValid: boolean, phoneExtraValid: boolean, companyValid: boolean, locationValid: boolean, messageValid: boolean, designValid: boolean = false;

  // Input variables
  let firstName: any;
  let lastName: any;
  let phone: any;
  let email: any;
  let company: any;
  let role: any;
  let projectType: any;
  let projectLocation: any;
  let designType: any;
  let budget: any;
  let message: any;

  function inputValid(input: any, errorName: string) {
    let value = input.target.value;
    let flag = false;

    if (value === null || value === undefined || value === '') {
      flag = true;
    }

    switch(errorName) {
      case 'first':
        firstError = flag;
        firstValid = !flag;
        break;
      case 'last':
        lastError = flag;
        lastValid = !flag;
        break;
      case 'email':
        emailError = flag;
        emailValid = !flag;
        break;
      case 'company':
        companyError = flag;
        companyValid = !flag;
        break;
      case 'location':
        locationError = flag;
        locationValid = !flag;
        break;
      case 'message':
        messageError = flag;
        messageValid = !flag;
        break;
    }
  }

  function phoneValid() {
    // Check phone field and format
    const phoneFormat = /^\d{10}$/;
    const phoneValidation = phoneFormat.test(phone);
    
    if (!phoneValidation) {
      phoneError = true;
      phoneExtraValid = false;
    } else {
      phoneError = false;
      phoneExtraValid = true;
    }
  }

  function finalValidation() {
    if (!firstValid || !lastValid || !emailValid || !companyValid || !locationValid || !messageValid || !phoneExtraValid || !designValid) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = async () => {
    // Get value of design type
    let selected = designType.querySelectorAll('input[type="checkbox"]:checked');
    let designValues: any[] = [];

    if (selected.length) {
      designError = false;
      designValid = true;
      selected.forEach((item:any) => {
        designValues = [...designValues, item.value]
      });
    } else {
      designError = true;
      designValid = false;
    }
    

    // Log values for testing
    console.log("First name: ", firstName);
    console.log("Last name: ", lastName);
    console.log("Phone: ", phone);
    console.log("Email: ", email);
    console.log("Company: ", company);
    console.log("Role: ", role);
    console.log("Project Type: ", projectType);
    console.log("Project Location: ", projectLocation);
    console.log("Design Type: ", designValues);
    console.log("Budget: ", budget);
    console.log("Message: ", message);

    // Run validation
    const validation = finalValidation();
    if (validation) {
      // Set loading state
      submitting = true;

      // Set options
      const options = {
        method: 'POST',
        headers: {
          revision: '2024-02-15',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            type: 'subscription',
            attributes: {
              custom_source: 'RSM Contact Form',
              profile: {
                data: {
                  type: 'profile',
                  attributes: {
                    email: `${email}`,
                    phone_number: `+1${phone}`,
                    first_name: `${firstName}`,
                    last_name: `${lastName}`,
                    organization: `${company}`,
                    title: `${role}`,
                    properties: {
                      projectType: `${projectType}`,
                      projectLocation: `${projectLocation ? projectLocation : ''}`,
                      designType: `${designValues}`,
                      budget: `${budget ? budget : ''}`,
                      message: `${message}`
                    }
                  }
                }
              }
            },
            relationships: {list: {data: {type: 'list', id: 'Uw9EZN'}}}
          },
        })
      }

      // Fetch call
      /* eslint-disable strict */
      try {
        const response = await fetch('https://a.klaviyo.com/client/subscriptions/?company_id=V8f9rv', options);
        console.log("Response Status: ", response.status);
        console.log(response);
        if (response.status === 202) {
          submitting = false;
          goto('/contact-form-received');
        } else {
          submitting = false;
          error = true;
        }
      } catch {
        console.log(error);
      }
    } else {
      // error = true;
    }
  }
</script>

<section>
  {#if submitting}
    <div class="loading text-center">
      <div class="spinner"></div>
    </div>
  {:else if error}
    <div class="error text-3xl mb-6 font-heading text-theme-light text-center">Sorry, there was an error submitting your email. Please try again.</div>
  {:else}
    <form id="klaviyoContact" on:submit|preventDefault={handleSubmit}>
      <!-- Left Column -->
      <div class="left-side">
        <div class="form-item">
          <label for="firstName">First name*</label>
          <input 
            name="firstName" 
            type="text" 
            required 
            bind:value={firstName} 
            class:error={firstError} 
            on:blur={(e) => inputValid(e, 'first')} />
          {#if firstError}
            <span class="error-message">Please enter your first name</span>
          {/if}
        </div>
        <div class="form-item">
          <label for="lastName">Last name*</label>
          <input 
            name="lastName" 
            type="text" 
            required 
            bind:value={lastName}
            class:error={lastError} 
            on:blur={(e) => inputValid(e, 'last')} />
          {#if lastError}
            <span class="error-message">Please enter your last name</span>
          {/if}
        </div>
        <div class="form-item">
          <label for="phone">Phone number*</label>
          <input 
            name="phone" 
            type="phone"
            placeholder="Example: 5005550006"
            required 
            bind:value={phone}
            class:error={phoneError} 
            on:blur={() => phoneValid()}/>
          {#if phoneError}
            <span class="error-message">Please enter a valid 10 digit phone number. No spaces or special characters</span>
          {/if}
        </div>
        <div class="form-item">
          <label for="email">Email address*</label>
          <input 
            name="email" 
            type="email"
            required 
            bind:value={email}
            class:error={emailError} 
            on:blur={(e) => inputValid(e, 'email')} />
          {#if emailError}
            <span class="error-message">Please enter your email address</span>
          {/if}
        </div>
        <div class="form-item">
          <label for="company">Name of company*</label>
          <input 
            name="company"
            type="text"
            required
            bind:value={company}
            class:error={companyError} 
            on:blur={(e) => inputValid(e, 'company')} />
          {#if companyError}
            <span class="error-message">Please enter the name of your company</span>
          {/if}
        </div>
        <div class="form-dropdown">
          <label for="role">Role*</label>
          <select name="role" bind:value={role}>
            <option disabled value="">Click to select...</option>
            <option value="Architect">Architect</option>
            <option value="Landscape Architect">Landscape Architect</option>
            <option value="Developer">Developer</option>
            <option value="Master Planner">Master Planner</option>
            <option value="Construction Management">Construction Management</option>
            <option value="PR/Communications/Marketing">PR/Communications/Marketing</option>
            <option value="Sign Fabricator">Sign Fabricator</option>
            <option value="Facilities">Facilities</option>
            <option value="Professor / Teacher">Professor / Teacher</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="form-dropdown">
          <label for="projectType">Project type*</label>
          <select name="projectType" bind:value={projectType}>
            <option disabled value="">Click to select...</option>
            <option value="Mixed-Use">Mixed-Use</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Retail">Retail</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Residential">Residential</option>
            <option value="Parks &amp; Outdoors">Parks &amp; Outdoors</option>
            <option value="Education">Education</option>
            <option value="Cultural">Cultural</option>
            <option value="Workplace">Workplace</option>
            <option value="Sports &amp; Entertainment">Sports &amp; Entertainment</option>
            <option value="Transit">Transit</option>
            <option value="Civic">Civic</option>
            <option value="Waterfront">Waterfront</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="form-item">
          <label for="location">Location of project*</label>
          <input 
            name="location" 
            type="text" 
            required 
            bind:value={projectLocation}
            class:error={locationError} 
            on:blur={(e) => inputValid(e, 'location')} />
          {#if locationError}
            <span class="error-message">Please enter the project location</span>
          {/if}
        </div>
      </div>
      <!-- Right Column -->
      <div class="right-side">
        <div class="form-radio">
          <p>Design needs*</p>
          <div class="buttons" bind:this={designType}>
            <div class="radio-btn">
              <input type="checkbox" id="environmental-graphic-design" name="design" value="environmental-graphic-design" checked />
              <label for="environmental-graphic-design">Environmental Graphic Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="branding-logo-design" name="design" value="branding-logo-design" />
              <label for="branding-logo-design">Branding &amp; Logo Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="wayfinding-signage" name="design" value="wayfinding-signage" />
              <label for="wayfinding-signage">Wayfinding Signage</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="placemaking" name="design" value="placemaking" />
              <label for="placemaking">Placemaking</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="public-arts-murals" name="design" value="public-arts-murals" />
              <label for="public-arts-murals">Public Arts &amp; Murals</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="master-sign-programs" name="design" value="master-sign-programs" />
              <label for="master-sign-programs">Master Sign Programs</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="donor-recognition" name="design" value="donor-recognition" />
              <label for="donor-recognition">Donor Recognition</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="digital-integration" name="design" value="digital-integration" />
              <label for="digital-integration">Digital Integration</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="exhibit-design" name="design" value="exhibit-design" />
              <label for="exhibit-design">Exhibit Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="other" name="design" value="other" />
              <label for="other">Other</label>
            </div>
            {#if designError}
              <span class="error-message">Please select at least 1 design option</span>
            {/if}
          </div>
        </div>
        <div class="form-dropdown">
          <label for="budget">Project Design Budget</label>
          <select name="budget" bind:value={budget}>
            <option disabled value="">Please select</option>
            <option value="zero-ten">$0 - $10,000</option>
            <option value="ten-seventy-five">$10,000 - $75,000</option>
            <option value="seventy-five-up">$75,000 & Up</option>
          </select>
        </div>
        <div class="form-message">
          <label for="message">Message*</label>
          <textarea 
            name="message" 
            required 
            bind:value={message}
            class:error={messageError} 
            on:blur={(e) => inputValid(e, 'message')}></textarea>
          {#if messageError}
            <span class="error-message">Please enter a brief description of the project</span>
          {/if}
        </div>
      </div>
      <div class="form-submit">
        <input type="submit" on:click={handleSubmit} />
      </div>
    </form>
  {/if}
</section>

<style lang="scss">
  #klaviyoContact {
    width: 100%;
    display: grid;
    column-gap: calc(var(--GRID-CELL) / 2);
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: 62.5em) {
      grid-template-columns: 1fr;
    }

    // > div {
    //   grid-column: 1;
    //   width: 100%;
    // }

    .error,
    :global(.error) {
        color: var(--COLOR-ORANGE);
        border-bottom: 1px solid var(--COLOR-ORANGE);
        margin-bottom: 8px;

        &:focus {
          color: var(--COLOR-MID-GRAY);
        }
    }

    .error-message {
      font-size: 12px;
      color: var(--COLOR-ORANGE);
      font-weight: bold;
      margin-bottom: 2rem;
      display: block;
    }

    .form-radio {
      grid-column: 1 / span 2;

      .buttons {
        margin-bottom: calc(var(--GRID-CELL) / 2);

        > div {
          display: flex;
          gap: 12px;
          justify-content: start;

          input {
            width: 0;
            height: 0;
            opacity: 0;
            visibility: hidden;
          }

          input ~ label {
            display: flex;
            gap: 8px;

            &::before {
              content: "";
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 1px solid var(--COLOR-MID-GRAY);
              border-radius: 4px;
              transition: all 250ms ease;
            }

            &:hover {
              cursor: pointer;

              &::before {
                background: var(--COLOR-DIM-GRAY);
              }
            }
          }

          input:checked ~ label {
            &::before {
              background: var(--COLOR-ORANGE);
              border-color: var(--COLOR-ORANGE);
            }
          }
        }
      }
    }

    label {
      font-weight: 400;
    }
    input,
    select,
    option {
      width: 100%;
      max-width: 100%;
      margin-bottom: 2em;
      padding: 0 0 0.25em;
      background-color: transparent;
      color: var(--COLOR-MID-GRAY);
      border: none;
      border-bottom: 1px solid var(--COLOR-MID-GRAY);
      border-radius: 0;

      &:focus {
        color: #3898ec;
        border-color: #3898ec;
        outline: 0;
      }
    }

    textarea {
      width: 100%;
      max-width: 100%;
      min-height: 225px;
      padding: 0.5em;
      background-color: transparent;
      color: var(--COLOR-MID-GRAY);
      border: none;
      border-radius: 0;
      margin: 0.25em 0 2em 0;
      border: 1px solid var(--COLOR-MID-GRAY);
      outline: none;

      &:global(.error) {
        border: 1px solid var(--COLOR-ORANGE);
      }
    }

    select {
      -moz-appearance: none; /* Firefox */
      -webkit-appearance: none; /* Safari and Chrome */
      appearance: none;

      > option {
        background-color: #2c2a2a;
        color: white;
      }
    }
    input[type=checkbox] {
      margin-right: 0.5em;
      width: 12px;
      height: 12px;
      background-color: var(--COLOR-MID-GRAY);
      border: 1px solid var(--COLOR-MID-GRAY);
      border-radius: 0;
      margin-bottom: 0;
    }

    input[type=submit] {
      width: auto;
      background-color: var(--COLOR-DIM-GRAY);
      transition: background-color 0.2s;
      padding: 9px 15px;
      color: white;
      border: none;
      border-radius: 0;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        background-color: #a2a4a7;
      }
    }
  }

  // .loading {
  //   display: grid;
  //   place-items: center;
  // }

  .spinner {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 9px solid;
    border-color: var(--COLOR-DIM-GRAY);
    border-right-color: var(--COLOR-ORANGE);
    animation: spinner-d3wgkg 1s infinite linear;
  }

  @keyframes spinner-d3wgkg {
    to {
      transform: rotate(1turn);
    }
  }
</style>