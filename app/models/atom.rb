class Atom
  attr_reader :bytes

  def initialize(bytes)
    @bytes = bytes
  end

  def type
    bytes_to_string(bytes.first(4))
  end

  def size
    array = substring(4, 4)
    bytes_to_i32(array)
  end

  def data
    substring(8, size)
  end

  private

  def substring(start, length)
    bytes[start...start+length]
  end

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
