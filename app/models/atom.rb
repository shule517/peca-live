class Atom
  attr_reader :bytes

  def initialize(bytes)
    @bytes = bytes
  end

  def type
    bytes.first(4).to_s
  end

  def size
    bytes.substring(4, 4).to_i
  end

  def data
    bytes.substring(8, size)
  end
end
