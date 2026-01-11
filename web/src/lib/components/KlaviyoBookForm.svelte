<script lang="ts">
	import { goto } from '$app/navigation';

	// List ID: RQtDzQ
  // Public API: V8f9rv

  // UI Triggers
  let submitting: any, error: any = false;
  let firstError: boolean, lastError: boolean, emailError: boolean, companyError: boolean, industryError: boolean = false;
  let firstValid: boolean, lastValid: boolean, emailValid: boolean, companyValid: boolean, industryValid: boolean = false;

  // Input variables
  let firstName: any;
  let lastName: any;
  let email: any;
  let company: any;
  let role: any;
  let industryType: any;

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
    }
  }

  function finalValidation() {
    if (!firstValid || !lastValid || !emailValid || !companyValid || !industryValid) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = async () => {
    // Get value of industry types
    let selected = industryType.querySelectorAll('input[type="checkbox"]:checked');
    let industryValues: any[] = [];

    if (selected.length) {
      industryError = false;
      industryValid = true;
      selected.forEach((item:any) => {
        industryValues = [...industryValues, item.value]
      });
    } else {
      industryError = true;
      industryValid = false;
    }
    

    // Log values for testing
    console.log("First name: ", firstName);
    console.log("Last name: ", lastName);
    console.log("Email: ", email);
    console.log("Company: ", company);
    console.log("Role: ", role);
    console.log("Industy Type: ", industryValues);

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
                    first_name: `${firstName}`,
                    last_name: `${lastName}`,
                    organization: `${company}`,
                    title: `${role}`,
                    properties: {
                      industryTypes: `${industryValues}`,
                    }
                  }
                }
              }
            },
            relationships: {list: {data: {type: 'list', id: 'RQtDzQ'}}}
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
          goto('/book-form-received');
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
    <form id="klaviyoBook" on:submit|preventDefault={handleSubmit}>
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
          <label for="company">Organization name*</label>
          <input 
            name="company"
            type="text"
            required
            bind:value={company}
            class:error={companyError} 
            on:blur={(e) => inputValid(e, 'company')} />
          {#if companyError}
            <span class="error-message">Please enter the name of your organization name</span>
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
        <div class="form-radio">
          <p>Industry / Market*</p>
          <div class="buttons" bind:this={industryType}>
            <div class="radio-btn">
              <input type="checkbox" id="environmental-graphic-design" name="design" value="environmental-graphic-design" checked />
              <label for="environmental-graphic-design">Mixed-Use Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="branding-logo-design" name="design" value="branding-logo-design" />
              <label for="branding-logo-design">Hospitality Signage Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="wayfinding-signage" name="design" value="wayfinding-signage" />
              <label for="wayfinding-signage">Workplace Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="placemaking" name="design" value="placemaking" />
              <label for="placemaking">Cultural Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="public-arts-murals" name="design" value="public-arts-murals" />
              <label for="public-arts-murals">Retail Environments & Graphic Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="master-sign-programs" name="design" value="master-sign-programs" />
              <label for="master-sign-programs">Sports & Entertainment</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="donor-recognition" name="design" value="donor-recognition" />
              <label for="donor-recognition">Food & Beverage</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="digital-integration" name="design" value="digital-integration" />
              <label for="digital-integration">Park Wayfinding & Signage</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="exhibit-design" name="design" value="exhibit-design" />
              <label for="exhibit-design">Civic Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="exhibit-design" name="design" value="exhibit-design" />
              <label for="exhibit-design">Education Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="exhibit-design" name="design" value="exhibit-design" />
              <label for="exhibit-design">Residential Community Signage</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="exhibit-design" name="design" value="exhibit-design" />
              <label for="exhibit-design">Transit Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="exhibit-design" name="design" value="exhibit-design" />
              <label for="exhibit-design">Healthcare Signage Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="exhibit-design" name="design" value="exhibit-design" />
              <label for="exhibit-design">Parking Garage Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="exhibit-design" name="design" value="exhibit-design" />
              <label for="exhibit-design">Waterfront Wayfinding Design</label>
            </div>
            <div class="radio-btn">
              <input type="checkbox" id="other" name="design" value="other" />
              <label for="other">Other</label>
            </div>
            {#if industryError}
              <span class="error-message">Please select at least 1 industry option</span>
            {/if}
          </div>
        </div>
        <div class="form-submit">
          <input type="submit" on:click={handleSubmit} />
        </div>
      </div>
    </form>
  {/if}
</section>

<style lang="scss">
  #klaviyoBook {
    width: 100%;
    display: grid;
    column-gap: calc(var(--GRID-CELL) / 2);
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: 62.5em) {
      grid-template-columns: 1fr;
    }

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
          align-items: center;
          margin-bottom: 8px;

          input {
            width: 0;
            height: 0;
            opacity: 0;
            visibility: hidden;
          }

          input ~ label {
            display: flex;
            gap: 8px;
            align-items: center;

            &::before {
              content: "";
              display: block;
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