# React Form Comparisons

Some react form tests and comparisons.

*Special thanks to the [@hixme-ui](https://github.com/hixme/hixme-ui) component library for styling these forms*


## Form and Function

```javascript
import React, { Component } from 'react';

import { ThemeProvider } from '@hixme-ui/theme'
import Text from '@hixme-ui/text'
import { Input, Button, FormGroup, Label } from '@hixme-ui/forms'

import { Form, validation } from 'form-and-function'

function hasError({ active, touched, error }) { return !active && touched && error }

const SpecialInput = ({ ownProps, input, meta }) => (
  <div>
    <Input {...input} error={hasError(meta)} />
    {hasError(meta) && <Text error>{meta.error}</Text>}
  </div>
)

const MyForm = ({ form, Field, ownProps: { title }, meta: { valid } }) => (
  <form {...form}>
    <h2>{title}</h2>
    <FormGroup>
      <Label>First Name</Label>
      <Field name='firstname' render={SpecialInput} hello='yes' />
    </FormGroup>

    <FormGroup>
      <Label>Last Name</Label>
      <Field name='lastname' render={SpecialInput} hello='yes' />
    </FormGroup>
    <Button
      submit
      submitting={false}
      submittingText='Submitting...'
      disabled={!valid}
    >
      Submit
    </Button>
  </form>
)

// Output form

        <Form
          name="my-form"
          render={MyForm}
          title="My form"
          initialValues={{
            firstname: 'Jim',
            lastname: 'Hendrix',
          }}
          validators={validation.create({
            firstname: ({ valid, invalid, ...props }) => value =>
              value.length > 3 ? valid() : invalid('Must be longer'),
            lastname: ({ valid, invalid, ...props }) => value =>
              value.length > 3 ? valid() : invalid('Must be longer'),
          })}
          onSubmit={(values) => {
            console.log('values = ', values)

            return new Promise((resolve) => {
              setTimeout(() => resolve, 2000)
            })
          }}
        />

```
