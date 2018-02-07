import React from 'react'
import { ThemeProvider } from '@hixme-ui/theme'
import ContentContainer from '@hixme-ui/content-container'
import Container from '@hixme-ui/container'
import Text from '@hixme-ui/text'
import { Input, Button, FormGroup, Label } from '@hixme-ui/forms'
import { Form, validation } from 'form-and-function'


// Error state helper
function hasError({
  active,
  touched,
  error
}) {
  return !active && touched && error
}

// Field component to render label, input, and error message
const FieldFormGroup = ({
  ownProps: {
    label
  },
  input,
  meta
}) => (
  <FormGroup>
    <Label>{label}</Label>
    <Input
      {...input}
      error={hasError(meta)}
    />
    {hasError(meta) && <Text error>{meta.error}</Text>}
  </FormGroup>
)

// Full form details
const MyForm = ({
  form,
  Field,
  meta: { valid }
}) => (
  <form {...form}>
    <Field
      name='firstname'
      renderProps={{ label: 'First Name' }}
      render={FieldFormGroup}
     />
    <Field
      name='lastname'
      renderProps={{ label: 'Last Name' }}
      render={FieldFormGroup}
     />

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

export default () => (
  <ThemeProvider>
    <ContentContainer>
      <Container textLeft width='400px'>
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
            // submit form
          }}
        />
      </Container>
    </ContentContainer>
  </ThemeProvider>
)

