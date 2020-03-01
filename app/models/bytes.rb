class Bytes
  attr_reader :bytes

  def initialize(bytes)
    @bytes = bytes
  end

  def [](index)
    bytes[index]
  end

  def first(length = 1)
    bytes.first(length).to_bytes
  end

  def substring(start, length)
    bytes[start...start+length].to_bytes
  end

  def to_i
    bytes.reverse! # little endianを変換
    byte1 = bytes[0] << 12
    byte2 = bytes[1] << 8
    byte3 = bytes[2] << 4
    byte4 = bytes[3]
    byte1 + byte2 + byte3 + byte4
  end

  def to_s
    bytes.map(&:chr).join
  end

  def to_a
    bytes
  end
end
