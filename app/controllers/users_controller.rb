class UsersController < ApplicationController
  before_action :get_user, except: [:index, :create]
  respond_to :html, :json

  def index
    @users = User.all
    respond_with(@users) do |format|
      format.json { render :json => @users.as_json }
      format.html
    end
  end

  def create
#binding.pry
    @user = User.new(user_params)
    if @user.save
      render json: @user.as_json, status: :ok
    else
      render json: {user: @user.errors, status: :no_content}
    end
  end

  def show
    respond_with(@user.as_json)
  end

  def update
  binding.pry
    if @user.update_attributes(user_params)
      render json: @user.as_json, status: :ok
    else
      render json: {user: @user.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    @user.destroy
    render json: {status: :ok}
  end

  private

  def user_params
    params.fetch(:user, {}).permit(:first_name, :last_name, :email, :phone)
  end

  def get_user
#binding.pry
    @user = User.find(params[:id])
    render json: {status: :not_found} unless @user
  end

end
