class Atom
  attr_reader :bytes

  def initialize(bytes)
    @bytes = bytes
  end

  def type
    bytes_to_string(bytes.first(4))
  end

  def size
    start = 4
    len = 4
    array = bytes[start...start+len]
    bytes_to_i32(array)
  end

  def data
    start = 8
    len = size
    bytes[start...start+len]
  end

  private

  def bytes_to_i32(bytes)
    bytes.reverse! # little endianを変換
    byte1 = bytes[0] << 12
    byte2 = bytes[1] << 8
    byte3 = bytes[2] << 4
    byte4 = bytes[3]
    byte1 + byte2 + byte3 + byte4
  end

  def bytes_to_string(bytes)
    bytes.map(&:chr).join
  end
end
