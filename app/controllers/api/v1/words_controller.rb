class Api::V1::WordsController < ApplicationController
  before_action :get_word, except: [:index, :create]
  respond_to :html, :json

  def index
    @words = Word.all
    respond_with(@words) do |format|
      format.json { render :json => @words.as_json }
      format.html
    end
  end

  def create
    @word = Word.new(word_params)
    if @word.save
      render json: @word.as_json, status: :ok
    else
      render json: {word: @word.errors, status: :no_content}
    end
  end

  def show
    respond_with(@word.as_json)
  end

  def update
    if @word.update_attributes(word_params)
      render json: @word.as_json, status: :ok
    else
      render json: {word: @word.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @word.destroy
    render json: {status: :ok}
  end

  private

  def word_params
    params.fetch(:word, {}).permit(:first_name, :last_name, :email, :phone)
  end

  def get_word
#binding.pry
    @word = Word.find(params[:id])
    render json: {status: :not_found} unless @word
  end

end
