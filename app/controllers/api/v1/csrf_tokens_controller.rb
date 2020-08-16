class Api::V1::CsrfTokensController < ApplicationController
  def show
    response.set_header('X-CSRF-Token', form_authenticity_token)
    head :ok
  end
end
